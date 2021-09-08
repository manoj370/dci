import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    $('.sidebar-dropdown > a').click(() => {
      $('.sidebar-submenu').slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .next('.sidebar-submenu')
          .slideDown(200);
        $(this)
          .parent()
          .addClass('active');
      }
    });
    const x = window.matchMedia('(max-width: 762px)');
    this.myFunction(x);
    // tslint:disable-next-line: deprecation
    x.addListener(this.myFunction);
  }
  myFunction(x) {
    if (x.matches) { // If media query matches
      $('.page-wrapper').removeClass('toggled');
      $('#show-sidebar').click(() => {
        $('.page-wrapper').addClass('toggled');
      });

      $('#close-sidebar').click(() => {
        $('.page-wrapper').removeClass('toggled');
      });

    } else {
      $('.page-wrapper').addClass('toggled');
      $('#show-sidebar').click(() => {
        $('.page-wrapper').addClass('toggled');
      });

      $('#close-sidebar').click(() => {
        $('.page-wrapper').removeClass('toggled');
      });
    }
  }
   // Logout
   logout() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
