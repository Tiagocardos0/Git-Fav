export class favoties {
    constructor(root) {
        this.root = document.querySelector(root)
    }
}

export class favoritesView extends favoties {
    constructor(root) {
        super(root)
        
    }

    update() {
        this.removeAllTr()
    }

    removeAllTr() {
        const tbody = this.root.querySelector('table tbody')

        tdoby.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        });
    }

}