import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, of, Subscription} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void',[
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class FileUploadComponent implements OnInit {

  @Input() text = 'Upload';
  @Input() param = 'file';
  @Input() target = 'gs://sicilia-angular.appspot.com';
  @Input() accept = 'image/*';
  @Input() delay = 5000;

  @Output() complete = new EventEmitter<string>();

  public files: Array<FileUploadModel> = []
  showProgress: boolean = true;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index]
        this.files.push({
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true
        })
      }
      this.uploadFiles();
    }
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe()
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement
    fileUpload.value = ''
    this.files.forEach(file => {
      this.uploadFile(file)
    })
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file)
    if (index > 1) {
      this.files.splice(index, 1)
    }
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);

            break;
          case HttpEventType.Response:
            const timeout = setTimeout(() => {
              clearTimeout(timeout)

              this.showProgress = false
            }, this.delay)
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      }
    );
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
