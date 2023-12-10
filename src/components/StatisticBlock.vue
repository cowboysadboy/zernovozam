<template>
    <div>
        <div class="statistic">
            <div class="statistic__size">
                Collection Size {{ getStatistic.size }} (100%)
            </div>
            <div class="gender-size">
                <div v-if="getStatistic.male" class="statistic__male" :style="`width: ${getPersent()[0]}%`">
                    Count of Male {{ getStatistic.male }} ({{ getPersent()[0] }}%)
                </div>
                <div v-if="getStatistic.female" class="statistic__female" :style="`width: ${getPersent()[1]}%`">
                    Count of Female {{ getStatistic.female }} ({{ getPersent()[1] }}%)
                </div>
            </div>

        </div>
        <div class="nat-header">
            Count of contacts for each nationality
        </div>
        <div class="statistic__nat">
            <div class="nat-elem" v-for="elem, i in getStatistic.nat" :key="i" :class="[{ 'even': i % 2 === 0 }]">
                <div class="header">{{ elem.nat }}</div>
                <div class="main">{{ elem.count }}</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'StatisticBlock',
    data() {
        return {
        }
    },
    methods: {
        //вычисление процентного соотношения мужчин и женщин
        getPersent() {
            const male = Math.round(this.getStatistic.male * 100 / this.getStatistic.size)
            let female = Math.round(this.getStatistic.female * 100 / this.getStatistic.size)
            if (male + female > 100) {
                return [male, female - 1] //гендерная дискриминация во имя корректных процентов
            }
            return [male, female]
        }
    },
    computed: { ...mapGetters(['getStatistic']) },

}
</script>
  
<style  lang="scss" scoped>
.statistic {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;

    .gender-size {
        width: 100%;
        display: flex;
    }

    &__size {
        width: 100%;
        height: 40px;
        background: rgb(60 72 72);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    &__male {
        height: 40px;
        background: rgb(165, 165, 240);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transition: all .1s ease-out;
    }

    &__female {
        height: 40px;
        background: rgb(239, 130, 130);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transition: all .1s ease-out;
    }



    &__nat {
        @media screen and (max-width: 780px) {
            font-size: 8px;
        }

        margin-bottom: 50px;
        display: flex;
        justify-content: space-between;
        background: #bfe6e5;

        .even {
            background: #d4fffd !important;
        }

        .nat-elem {
            width: -webkit-fill-available;
            padding: 10px 0;
        }
    }
}

.nat-header {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    background: rgb(60 72 72);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
  