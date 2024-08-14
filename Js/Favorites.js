export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())    
        .then(({ login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem
            ('@github-favorites')) || []
    }

    save() {
        localStorage.setItem('@github-favorites' , JSON.stringify(this.entries))
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username)

            if(userExists) {
                throw new Error('Este usuário ja existe')
            }

            const user = await GithubUser.search(username)
             if (user.login === undefined) {
                throw new Error('Usuário não encontrado!')
             }

             this.entries = [user, ...this.entries]
             this.update()
             this.save()

        } catch(error) {
            alert(error.message)
        }
    }

    delete(user) {
        const FilteredEntries = this.entries.filter((entry)=> entry.login !== user.login)

        this.entries = FilteredEntries

        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }

    onAdd() {
        const BtnFavorite = this.root.querySelector('header .search button')

        BtnFavorite.addEventListener('click', () => {
            const {value} = this.root.querySelector('header .search input')

            this.add(value)
        })
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => { /* Para cada objeto dentro do ARRAY Cria-se uma linha (TR) */
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.btnremove').addEventListener('click', ()=> {
                const isOk = confirm("Você tem certeza que deseja excluir?")

                if (isOk) {
                    this.delete(user)
                }
            })

            this.tbody.append(row)
        })
    }

    removeAllTr() { /* Remove todas as linhas da tabela TR */
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        });
        
    }

    createRow() { /* Cria uma linha na tabela TR */
        const tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="user">
                <img src="" alt="">
                <a href="" target="_blank"> <p></p> <span></span></a>
                
            </td>
            <td class="repositories">23</td>
            <td class="followers">4</td>
            <td><button class="btnremove">Remover</button></td>
        `
        return tr
    }

}