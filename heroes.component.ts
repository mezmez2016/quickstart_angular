import {Component, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HeroService}    from "./hero.service";
import {Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  styleUrls: ['heroes.component.css'],
  templateUrl: 'heroes.component.html',
})
export class HeroesComponent implements OnInit {
  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(private router: Router, private heroService: HeroService) {

  }


  selectedHero: Hero;
  heroes: Hero[];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    //console.log(this);
    this.heroService.getHeroes().then(xx => this.heroes = xx);

  }


  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
