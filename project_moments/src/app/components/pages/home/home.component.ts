import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';

import { IMoment } from 'src/app/interfaces/IMoment';

import { environment } from 'src/environment/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: IMoment[] = [];
  moments: IMoment[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearchIcon = faSearch;
  searchTerm: string = '';

  // todo Search

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR');
        item.image = this.baseApiUrl + '/uploads/' + item.image;
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
