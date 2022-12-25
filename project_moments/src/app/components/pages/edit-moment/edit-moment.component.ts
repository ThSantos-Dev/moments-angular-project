import { Component, OnInit } from '@angular/core';

import { IMoment } from 'src/app/interfaces/IMoment';

import { MomentService } from 'src/app/services/moment.service';

import { ActivatedRoute, Router } from '@angular/router';

import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: IMoment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async editHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    // Validando se a imagem foi passada
    if (typeof moment.image !== 'string')
      formData.append('image', moment.image);

    this.momentService.updateMoment(this.moment.id!, formData).subscribe();

    this.messageService.add('O momento fpo atualizado com sucesso!');
    this.router.navigate(['/']);
  }
}
