import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anothersection',
  templateUrl: './anothersection.component.html',
  styleUrls: ['./anothersection.component.css']
})
export class AnothersectionComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {

  }


}