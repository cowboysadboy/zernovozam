<template>
    <div class="table-header">
        <div v-for="cell in tableHeader" :key="cell.id" class="table-header__sell">
            {{ cell.count }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TableHeader',
    data() {
        return {
            //для генерации полей описания таблицы
            tableHeader: [
                {
                    id: 0,
                    count: 'avatar'
                },
                {
                    id: 1,
                    count: 'fullname'
                },
                {
                    id: 2,
                    count: 'birthday'
                },
                {
                    id: 3,
                    count: 'email'
                },
                {
                    id: 4,
                    count: 'phone'
                },
                {
                    id: 5,
                    count: 'location'
                },
                {
                    id: 6,
                    count: 'nationality'
                },
            ]
        }
    },

}
</script>
  
<style  lang="scss" scoped>
.table-header {
    @media screen and (max-width:768px) {
     font-size: 10px;
    }
    display: flex;
    padding: 15px;
    justify-content: space-between;
    color: white;
    background: #3c4848;

    &__sell {
        width: 12%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
  