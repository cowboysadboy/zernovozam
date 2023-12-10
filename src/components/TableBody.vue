<template>
    <section>
        <div class="person" v-for="person, id in persons" :key="person.id.value" :class="[{ 'even': id % 2 === 0 }]">
            <div class="person__avatar">
                <img :src="person.picture.large" alt="avatar">
            </div>
            <div class="person__fullname">
                {{ person.name.title }} {{ person.name.first }} {{ person.name.last }}
            </div>
            <div class="person__birthday">
                {{ getDate(person.dob.date) }}
            </div>
            <div class="person__email" @click="copyToClipboard(person.email)">
                {{ person.email }}
            </div>
            <div class="person__phone" @click="copyToClipboard(person.phone)">
                {{ person.phone }}
            </div>
            <div class="person__location">
                {{ person.location.country }} <br /> {{ person.location.city }}
            </div>
            <div class="person__nat">
                {{ person.nat }}
            </div>
        </div>
    </section>
</template>
  
<script>
import moment from 'moment';
export default {
    name: 'TableBody',
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
        copyToClipboard(text) {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert('The text is copied to your clipboard');
        }
    },

}
</script>
  
<style  lang="scss" scoped>
.person {
    @media screen and (max-width: 780px) {
        font-size: 8px;
    }

    display: flex;
    padding: 15px;
    justify-content: space-between;

    &__avatar {
        img {
            width: 100%;
            height: auto;
        }
    }

    &__email {
        word-break: break-all;
    }
}

.even {
    background: #d4fffd;
}

.person>div {
    width: 12%;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    margin: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
  