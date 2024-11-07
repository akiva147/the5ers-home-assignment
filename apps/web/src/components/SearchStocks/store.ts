import { SingleStock } from '@the5ers-home-assignment/schemas';
import { makeAutoObservable } from 'mobx';

class Store {
  query = '';
  data: SingleStock[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(value: string) {
    this.query = value;
  }

  addData(data: SingleStock[]) {
    this.data = data;
  }
}

export const store = new Store();

// export class MovieStore {
//   #queryClient = Inject(this, QueryClient);
//   #moviesQueryResult = observable({}, { deep: false });

//   get movies() {
//     if (!this.subscription) {
//       const observer = new QueryObserver(this.)
//     }
//   }
// }
