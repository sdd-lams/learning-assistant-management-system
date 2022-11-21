import { La } from './../../interfaces/la';
import { RequestsService } from '../../services/requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-las-list-component',
  templateUrl: './las-list-component.component.html',
  styleUrls: ['./las-list-component.component.css']
})
export class LasListComponentComponent implements OnInit {

  constructor(private requestService: RequestsService) { }
  allLas?: La[];

  ngOnInit(): void {
    // console.log(this.requestService.getLas());
    this.requestService.getLas().subscribe((las: La[]) => {
      console.log(las);
      this.allLas = las;
    }); 
  }

}
