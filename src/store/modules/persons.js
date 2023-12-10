export default {
    actions: {
        //Запрос на REST API для получения данных
        async fetchPersons(ctx) {
            const res = await fetch('https://randomuser.me/api/?results=200')
            const persons = await res.json()
            ctx.commit('updatePersons', persons.results)
        },
        filterPersons(ctx, filter) {
            ctx.commit('updateFilter', filter)
        }
    },
    mutations: {
        //Мутация для обновления данных state.persons
        updatePersons(state, persons) {
            state.persons = persons
        },
        //Мутация для обновления данных полей фильтра
        updateFilter(state, filter) {
            state.filter = filter
        }
    },

    state: {
        filter: {
            gender: '',
            name: '',
            national: ''
        },
        persons: []
    },

    getters: {
        getNations(state) {
            return state.persons.reduce((acc, person) => {
                if (!acc.includes(person.nat)) {
                    acc.push(person.nat)
                }
                return acc
            }, [])
        },
        //фильтрация коллекции
        filterPersons(state) {
            const { gender, name, national } = state.filter
            if (!gender && !name && !national) {
                // Если ни один из параметров не указан, возвращаем неотфильтрованный массив
                return state.persons;
            }
            // Функция для проверки соответствия переданной строки в поле name объекта
            function nameMatches(person) {
                if (!name) {
                    // Если name не указан, считаем, что соответствие есть
                    return true;
                }
                let fullName = person.name.first + ' ' + person.name.last
                return fullName.toLowerCase().includes(name.toLowerCase())
            }

            // Функция для проверки соответствия переданного значения в поле gender объекта
            function genderMatches(person) {
                if (!gender) {
                    // Если gender не указан, считаем, что соответствие есть
                    return true;
                }
                return person.gender === gender;
            }
            // Функция для проверки соответствия переданного значения в поле national объекта
            function nationalMatches(person) {
                if (!national) {
                    // Если national не указан, считаем, что соответствие есть
                    return true;
                }
                return person.nat === national;
            }
            // Фильтруем массив persons по указанным условиям
            return state.persons.filter(person => {
                return genderMatches(person) && nationalMatches(person) && nameMatches(person)
            })
        },
        //получение массива persons в исходном варианте
        getPersons(state, getters) {
            return getters.filterPersons
        },

        //сортировка массива persons от A до Z
        sortAz(state, getters) {
            const sortedPersons = [...getters.filterPersons]
            return sortedPersons.sort((a, b) => {
                const fullNameA = `${a.name.first} ${a.name.last }`;
                const fullNameB = `${b.name.first} ${b.name.last }`;
                return fullNameA.localeCompare(fullNameB);
            });
        },
        //сортировка массива persons от Z до A
        sortZa(state, getters) {
            const sortedPersons = [...getters.filterPersons]
            return sortedPersons.sort((a, b) => {
                const fullNameA = `${a.name.first} ${a.name.last }`;
                const fullNameB = `${b.name.first} ${b.name.last }`;
                return fullNameB.localeCompare(fullNameA);
            });
        },

        //получение статистики по массиву
        getStatistic(state, getters) {
            const statistics = { //объект для сохранения статистики
                size: 0,
                male: 0,
                female: 0,
                nat: {}
            }
            statistics.size = getters.filterPersons.length //подсчитываем длину коллекции
            const count = getters.filterPersons.reduce((acc, obj) => { // Используем метод reduce() для подсчета гендеров
                if (obj.gender === "male") {
                    acc.male++;
                } else if (obj.gender === "female") {
                    acc.female++;
                }
                return acc;
            }, { male: 0, female: 0 });
            statistics.female = count.female
            statistics.male = count.male
            const nat = getters.filterPersons.reduce((count, obj) => { //подсчитываем количество контактов для конкретных национальностей
                if (obj.phone && obj.phone !== '') {
                    count[obj.nat] = (count[obj.nat] || 0) + 1;
                }
                return count;
            }, {});
            statistics.nat = Object.entries(nat).map(([nat, count]) => ({ nat, count })).sort((a, b) => a.count - b.count);
            return statistics
        }
    },
}