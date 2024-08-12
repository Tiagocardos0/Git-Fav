export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'Tiagocardos0',
                name: 'Tiago cardoso',
                public_repos: '24',
                followers: '1000'
            },

            {
                login: 'DFelipe1',
                name: 'David Felipe',
                public_repos: '32',
                followers: '350'
            }
        ]
    }

    delete(user) {
        const FilteredEntries = this.entries.filter((entry)=> entry.login !== user.login)
        console.log(FilteredEntries)

        this.entries = FilteredEntries

        this.update()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => { /* Para cada objeto dentro do ARRAY Cria-se uma linha (TR) */
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
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
                <img src="https://github.com/Tiagocardos0.png" alt="">
                <a href="https://github.com/Tiagocardos0" target="_blank"> <p></p> <span></span></a>
                
            </td>
            <td class="repositories">23</td>
            <td class="followers">4</td>
            <td><button class="btnremove">Remover</button></td>
        `
        return tr
    }

}