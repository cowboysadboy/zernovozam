<template>
    <div class="auth">
        <div class="auth__header">
            <h2>Select authorization option</h2>
        </div>
        <div v-for="elem in authOptions" :key="elem.id" class="auth__option">
            <label>
                <input type="radio" v-model="user_status" :value="elem.count" @change="checkOption()"> {{ elem.count }}
            </label>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'AuthComponent',
    data() {
        return {
            user_status: '',
            //для генерации выбора роли пользователя (user/admin)
            authOptions: [
                {
                    id: 0,
                    count: 'admin'
                },
                {
                    id: 1,
                    count: 'user'
                }
            ]
        }
    },
    methods: {
        checkOption() {
            localStorage.setItem('user_status', this.user_status);
            this.$router.push('/');
        },
    },

}
</script>
  
<style  lang="scss" scoped>
.auth {
    display: flex;
    flex-direction: column;
}
</style>
  