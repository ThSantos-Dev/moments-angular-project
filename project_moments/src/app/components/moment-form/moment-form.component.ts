import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environment/environment';
import { IMoment } from './../../interfaces/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>();
  @Input() btnText!: string;
  @Input() momentData?: IMoment;

  baseApiUrl = environment.baseApiUrl;

  // Formulário
  momentForm!: FormGroup;
  preview_url?: string;

  ngOnInit(): void {
    // Inicializando o formulário
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData?.id ? this.momentData.id : ''),
      title: new FormControl(
        this.momentData?.title ? this.momentData.title : '',
        [Validators.required]
      ),
      description: new FormControl(
        this.momentData?.description ? this.momentData.description : '',
        [Validators.required]
      ),
      image: new FormControl(
        this.momentData?.image
          ? `${this.baseApiUrl}/uploads/${this.momentData.image}`
          : ''
      ),
    });

    if (this.momentData?.image)
      this.preview_url = `${this.baseApiUrl}/uploads/${this.momentData.image}`;
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    // Insere um valor no formulário, sem ser pelo bindiging
    this.momentForm.patchValue({ image: file });

    // Preview da Imagem
    const reader = new FileReader();
    reader.onload = () => {
      this.preview_url = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.momentForm.invalid) return;

    console.log(this.momentForm.value);

    // Emitindo um evento com os dados do formulário para o componente pai
    this.onSubmit.emit(this.momentForm.value);
  }
}
