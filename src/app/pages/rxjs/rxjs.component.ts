import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry,take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent  implements OnDestroy{

  public intervalSubs: Subscription ;

  constructor() {
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
    
    /*
    this.retornaObservable().pipe(
      retry()
    ).subscribe(
      valor=> console.log('subs', valor),
      err=> console.warn('Error', err),
      () => console.info("Obs terminado")
    );
    */
   }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo() : Observable<number>{

    return interval(500)
          .pipe(
           // take(10),
            map( valor => valor +1 ),
            filter(valor => (valor % 2 ===0 ? true:false))
          );

   }

   retornaObservable() : Observable<number> {
    let i=-1;

    const obs$ = new Observable<number>( oberver =>{
        
       const intervalo=  setInterval( ()=>{
          i++;
          oberver.next(i);

          if(i === 4){
            clearInterval(intervalo);
            oberver.complete();
          }

          if(i === 2){
            oberver.error("i llegó a 2")
          }

        },1000)

    });

    return obs$;
   }



}
