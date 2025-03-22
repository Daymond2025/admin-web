export interface navItem {
    label:string;
    disabled?:boolean
    children?:navItem[],
    options?:navItem[],
    url?:string,
    routerLink?:string,
    path?:string,
    visible?:boolean,
    iconActive?:string,
    iconDesactive?:string,
    command?: () => void;
}

export const menu : navItem[] = [
    {
        label:"Dashboard",
        disabled:false,
        visible:true,
        // routerLink:"/administration",
        iconDesactive:"assets/img/daydash2.png",
    },
    {
        label:"Distribution",
        disabled:false,
        visible:true,
        routerLink:"/distribution",
        iconDesactive:"assets/img/daydash3.png",
        iconActive:"assets/img/daydash3.png",
        children:[
            {
                label:"Commandes",
                disabled:false,
                visible:true,
                routerLink:"/distribution/orders",
                iconDesactive:"assets/img/daydash3.png",
                iconActive:"assets/img/cart.png",
                children:[]
            },
            {
                label:"Produits",
                iconActive:"assets/img/product.png",
            },
            {
                label:"Paiements",
                iconActive:"assets/img/paye.png",
            },
            {
                label:"Comptabilité",
                iconActive:"assets/img/comptable.png",
            },
            {
                label:"7 étoiles",
                iconActive:"assets/img/etap.png",
            },
            {
                label:"Rappel",
                iconActive:"assets/img/rapz.png",
            },

        ],
        options:[
            {
                label:"Réglage",
                iconActive:"assets/img/parametre.png",
            },
            {
                label:"Annonces",
                iconActive:"assets/img/iconz4.png",
            },
            {
                label:"Les utilisateurs",
                iconActive:"assets/img/pm1.png",
            },
            {
                label:"Les fournisseurs",
                iconActive:"assets/img/pm5.png",
            },
            {
                label:"Statistiques",
                iconActive:"assets/img/pm7.png",
            },
            {
                label:"Historiques",
                iconActive:"assets/img/pm4.png",
            },
            {
                label:"Les supprimés",
                iconActive:"assets/img/pm3.png",
            },
            {
                label:"Les produits",
                iconActive:"assets/img/pm6.png",
            },
            {
                label:"Bases de données",
                iconActive:"assets/img/pm2.png",
            },
        ]
    },
    {
        label:"Fournisseurs",
        disabled:false,
        visible:true,
        // routerLink:"/administration/articles",
        iconDesactive:"assets/img/daydash4.png",
    },
    {
        label:"Recruteurs vendeurs",
        disabled:false,
        visible:true,
        routerLink:"/recruteur",
        iconDesactive:"assets/img/daydash5.png",
        iconActive:"assets/img/daydash51.png",
        children:[
            {label:"Les recruteurs",iconActive:"assets/img/product.png",},
            {label:"Les vendeurs",iconActive:"assets/img/vebd.png",},
            {label:"Statistiques",iconActive:"assets/img/pm7.png",},
            {label:"Commande badges",iconActive:"assets/img/certif.png",},
            {label:"Paiements",iconActive:"assets/img/paye.png",},
        ],
        options:[
            {label:"Portefeuille",iconActive:"assets/img/parametre.png",},
            {label:"Annonces",iconActive:"assets/img/iconz4.png",},
            {label:"Bases de données",iconActive:"assets/img/pm2.png",},
        ]
    },
    {
        label:"Paramètres",
        disabled:false,
        visible:true,
        // routerLink:"/administration/articles",
        iconDesactive:"assets/img/daydash1.png",
    },
    
]