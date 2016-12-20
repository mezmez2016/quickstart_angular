import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
/**
 * Created by m.ezeouati on 16/12/2016.
 */
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl) .toPromise() .then(response => response.json().data as Hero[]) .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getHeroesSlowly(): Promise < Hero[] > {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 20)).then(() => this.getHeroes());
  } // delay 2 seconds

  /**
   * old getHero(id: numder) replaced by method based on http
   * @param id
   * @returns {Promise<TResult|T>}
   */
 // getHero(id: number): Promise < Hero > {
  //  return this.getHeroes() .then(heroes => heroes.find(hero => hero.id === id));
  //}

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url) .toPromise() .then(response => response.json().data as Hero) .catch(this.handleError);
  }


  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }



}

