import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialInstance, MaterialService} from '../../../../../../shared/service/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../../shared/interfaces'
import {PositionsService} from '../../../../shared/service/positions.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('input') inputRef: ElementRef

  positions: Position[] = []
  loading = false
  positionId = null
  modal: MaterialInstance
  form: FormGroup
  image: File
  imagePreview: string | ArrayBuffer = ''

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      subtitle: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sale: new FormControl(null),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    console.log(position);
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
      description: position.description,
      sale: position.sale,
      subtitle: position.subtitle
    })
    this.imagePreview = position.imageSrc
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({name: null, cost: 1})
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decision) {
      this.positionsService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.imagePreview = ''
    this.modal.close()
  }

  onSubmit(): void {

    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      subtitle: this.form.value.subtitle,
      sale: this.form.value.sale,
      description: this.form.value.description,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
      this.imagePreview = ''
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition, this.image).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionsService.create(newPosition, this.image).subscribe(
        position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }


  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }
}
