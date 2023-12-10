<template>
    <section>
        <div class="tiles">
            <div class="person" v-for="person, id in persons" :key="person.id.value" :class="[{ 'even': id % 2 === 0 }]">
                <div class="person__avatar">
                    <img :src="person.picture.large" alt="avatar">
                </div>
                <div class="person__fullname">
                    <span>fullname</span>
                    {{ person.name.title }} {{ person.name.first }} {{ person.name.last }}
                </div>
                <div class="person__birthday">
                    <span>birthday</span>
                    {{ getDate(person.dob.date) }}
                </div>
                <div class="person__email">
                    <span>email</span>
                    {{ person.email }}
                </div>
                <div class="person__phone">
                    <span>phone</span>
                    {{ person.phone }}
                </div>
                <div class="person__location">
                    <span>location</span>
                    {{ person.location.country }} <br /> {{ person.location.city }}
                </div>
                <div class="person__nat">
                    <span>nationality</span>
                    {{ person.nat }}
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
import moment from 'moment';
export default {
    name: 'TileView',
    props: {
        persons: {
            type: Array,
            required: true
        }
    },

    methods: {
        //функция для представления формата даты в удобном виде
        getDate(date) {
            return moment(date).format('DD MMMM YYYY')
        },
    },
}
</script>
  
<style  lang="scss" scoped>
.tiles {
    display: flex;
    flex-wrap: wrap;

}

.person {
    font-size: 10px;

    @media screen and (max-width: 780px) {
        font-size: 8px;
        width: 33%;
    }

    @media screen and (max-width: 425px) {
        font-size: 8px;
        width: 50%;
    }

    width: 20%;
    max-height: 440px;
    display: flex;
    margin: 2px 0;
    flex-direction: column;
    // padding: 15px;
    justify-content: space-between;

    &__avatar {
        img {
            width: 100%;
            height: auto;
        }
    }

    &__email {
        word-break: break-all;
        min-height: 40px;
    }
}

.even {
    background: #d4fffd;
}

.person>div {
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    margin: 1px;
    display: flex;
    flex-wrap: wrap;
    font-weight: 600;
    color: #404040;
    margin-bottom: 12px;
    align-items: center;
    justify-content: center;
}

.person>div span {
    width: 100%;
    font-size: 10px;
    color: #aca9a9;
}
</style>
  