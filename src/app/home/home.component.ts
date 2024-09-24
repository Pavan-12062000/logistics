import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.animateValue('count1', 0, 1800000, 2000);
    this.animateValue('count2', 0, 99.8, 2000);
    this.animateValue('count3', 0, 50, 2000);
    this.animateValue('count4', 0, 14, 2000);
  }

  animateValue(id: string, start:number, end:number, duration:number) {
    const element = document.getElementById(id);
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(Math.floor(start + (end - start) * (progress / duration)), end);
      element!.innerText = current.toString();
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 700,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  testimonialsSlider: OwlOptions = {
    loop: true, // Loop through items
    autoplay: true, // Auto-start the sliding
    autoplaySpeed: 700, // Speed of the sliding
    autoplayTimeout: 3000, // Time delay between slides
    dots: true, // Show dots below the carousel
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  };  

  testimonials = [
    {
      name: 'John Doe',
      message: 'Great service and fast delivery! Highly recommended.'
    },
    {
      name: 'Jane Smith',
      message: 'Amazing experience! The logistics were well-managed and timely.'
    },
    {
      name: 'Mike Johnson',
      message: 'Efficient and reliable service, will definitely use again!'
    },
    {
      name: 'Sara Williams',
      message: 'The staff was friendly and my shipment arrived ahead of time.'
    },
    {
      name: 'Alex Lee',
      message: 'A seamless process from start to finish. Very professional.'
    },
    {
      name: 'Emily Davis',
      message: 'Affordable pricing with top-notch service. Couldn’t be happier!'
    }
  ];

  redirectToBookService(serviceType: string): void{
    this.router.navigate(['/bookaservice'], { state: { serviceType: serviceType } });
  }
}