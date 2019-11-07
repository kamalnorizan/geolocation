import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.page.html',
  styleUrls: ['./secondpage.page.scss'],
})
export class SecondpagePage implements OnInit {
  status: any = '';
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.status = this.activatedRoute.snapshot.params['status'];
  }

}
