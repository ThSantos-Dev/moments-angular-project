import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

import { IMoment } from 'src/app/interfaces/IMoment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from './../../../services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  async createHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    // Validando se a imagem foi passada
    if (moment.image) formData.append('image', moment.image);

    await this.momentService
      .createMoment(formData)
      .subscribe(() => console.log('Req feita'));

    this.messagesService.add('Momento adicionado com sucesso!');

    this.router.navigate(['/'])
  }
}
