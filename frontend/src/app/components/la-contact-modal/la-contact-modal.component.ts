import { La } from './../../interfaces/la';
import { RequestsService } from '../../services/requests.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-la-contact-modal',
  templateUrl: './la-contact-modal.component.html',
  styleUrls: ['./la-contact-modal.component.css']
})
export class LaContactModalComponent implements OnInit {
  @Output() onSubmitEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private requestService: RequestsService) { }
  allLas?: La[];

  ngOnInit(): void {
    // console.log(this.requestService.getLas());
    this.requestService.getLas().subscribe((las: La[]) => {
      console.log(las);
      this.allLas = las;
    }); 
  }

  onClose() {
    this.onSubmitEvent.emit();
  }
}
