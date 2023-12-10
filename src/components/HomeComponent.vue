<template>
  <div class="wrapper">

    <div class="filter-wrapper">
      <login-status></login-status>
      <div v-if="user_status === 'admin'" class="filter">
        <div class="filter__gender">
          <label>
            <input type="radio" v-model="filter.gender" value="male" @change="filterCollection()"> Male
          </label>
          <label>
            <input type="radio" v-model="filter.gender" value="female" @change="filterCollection()"> Female
          </label>
          <label>
            <input type="radio" v-model="filter.gender" value="" @change="filterCollection()"> All Genders
          </label>
        </div>
        <div class="filter__nat">
          Choose a Nation
          <select v-model="filter.national" @change="filterCollection()">
            <option value=""> All National </option>
            <option v-for="elem, i in getNations" :key="i"> {{ elem }}</option>
          </select>
        </div>
        <div class="filter__name">
          <span>Filter by full Name</span>
          <input type="text" v-model="filter.name" @input="filterCollection()">
        </div>
      </div>
    </div>

    <statistic-block></statistic-block>
    <div class="buttons">
      <button @click="changeView">tile/table view</button>
      <button class="default-sort" @click="sortedDefault">default sort</button>
      <button class="az-sort" @click="sortedAz">A-Z sort</button>
      <button class="za-sort" @click="sortedZa">Z-A sort</button>
    </div>
    <table-header v-if="!tile"></table-header>
    <table-body v-if="!tile" :persons="paginatedData"></table-body>
    <tile-view v-if="tile" :persons="paginatedData"></tile-view>
    <div class="buttons-pagination">
      <button :disabled="pageNumber === 0" @click="prevPage">
        Previous Page
      </button>
      <span> {{ pageNumber + 1 }}/{{ pageCount }}</span>
      <button :disabled="pageNumber >= pageCount - 1" @click="nextPage">
        Next Page
      </button>
    </div>
    <button class="upbate-button" @click="loadData"> Update Collection</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import StatisticBlock from './StatisticBlock.vue';
import TileView from './TileView.vue';
import LoginStatus from './LoginStatus.vue';
export default {
  name: 'TabularView',
  components: {
    TableHeader,
    TableBody,
    StatisticBlock,
    TileView,
    LoginStatus
  },
  computed: {
    ...mapGetters(['getPersons', 'sortAz', 'sortZa', 'getStatistic', 'getNations']),
    //выяснение количества страниц для пагинации
    pageCount() {
      let l = this.persons.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    //отфильтровывание элементов для пагинации 
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.persons
        .slice(start, end);
    }
  },
  data() {
    return {
      user_status: '',
      filter: {
        gender: '',
        name: '',
        national: ''
      },
      persons: [],
      tile: false,
      pageNumber: 0, //номер страницы для пагинации
      size: 10 //количество записей на странице для пагинации
    }
  },
  methods: {
    ...mapActions(['fetchPersons', 'filterPersons']),

    //увеличение текущей страницы
    nextPage() {
      this.pageNumber++;
    },
    //уменьшение текущей страницы
    prevPage() {
      this.pageNumber--;
    },

    //для вызова фильтрации коллекции согласно полям объекта компонента
    filterCollection() {
      this.filterPersons(this.filter)
      this.persons = this.getPersons
      this.pageNumber = 0
    },

    //для сохранения в localstorage выбора отображения коллекции (плитка/таблица)
    changeView() {
      this.tile = !this.tile
      localStorage.setItem('tile', this.tile);
    },

    //запись в переменную компонента отфильтрованных коллекций из геттера
    sortedDefault() { this.persons = this.getPersons },
    sortedAz() { this.persons = this.sortAz },
    sortedZa() { this.persons = this.sortZa },

    //Функция получения коллекции и записи ее в переменную компонента
    async loadData() {
      await this.fetchPersons()
      this.persons = this.getPersons
    },

    redirectToAuth() {
      this.$router.push('/auth');
    }
  },
  async mounted() {
    if (!localStorage.getItem('user_status')) {
      this.redirectToAuth()
    }
    this.user_status = localStorage.getItem('user_status')
    //для сохранения в localstorage выбора отображения коллекции (плитка/таблица)
    if (localStorage.getItem('tile') === 'true') {
      this.tile = true
    }
    this.loadData()
  }
}
</script>

<style  lang="scss" scoped>
.wrapper {
  max-width: 960px;
  margin: 0 auto;

  .filter-wrapper {
    display: flex;
    align-items: center;

    @media screen and (max-width:768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .filter {
    width: 100%;
    display: flex;

    @media screen and (max-width:768px) {
      width: fit-content;
      display: flex;
      flex-direction: column;
    }

    div {
      font-size: 15px;
      font-weight: 600;
      display: flex;
      background: #e3f1f1;
      padding: 20px 25px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    &__nat {
      align-items: center !important;

      select {
        border: 2px solid;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        min-width: 120px;
      }
    }

    &__name {
      align-items: center !important;

      input {
        max-width: 120px;
        border: 2px solid;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
      }
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-left: -5px;

    button {
      border: none;
      color: white;
      padding: 5px 20px;
      margin: 10px 5px;
      background: #7a7a7a;
    }

    button:hover {
      background: #2f3737;
    }
  }

  .upbate-button {
    border: none;
    background: #ef8282;
    padding: 11px 20px;
    color: white;
    margin-bottom: 15px;
  }

  .upbate-button:hover {
    background: #d93737;
  }

  .buttons-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    button {
      border: none;
      color: white;
      padding: 5px 20px;
      margin: 10px 5px;
      background: #6a6ad0;
      min-width: 127px;
    }

    button:hover {
      background: #323261;
    }

    span {
      margin: 0 20px;
    }
  }
}
</style>
