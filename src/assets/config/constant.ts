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
        routerLink:"/dashboard",
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
                routerLink:"/distribution/commandes",
                iconDesactive:"assets/img/daydash3.png",
                iconActive:"assets/img/cart.png",
                children:[
                    {
                        label:"Call center",
                        iconActive:"assets/img/product.png",
                        routerLink:"/distribution/commandes/list_call",
                    },
                    {
                        label:"Coordinateur",
                        iconActive:"assets/img/product.png",
                        routerLink:"/distribution/commandes/list_cord",
                    },
                ]
            },
            {
                label:"Produits",
                iconActive:"assets/img/product.png",
                routerLink:"/distribution/produits",
            },
            {
                label:"Paiements",
                iconActive:"assets/img/paye.png",
                routerLink:"/distribution/paiements",
            },
            {
                label:"Comptabilite",
                iconActive:"assets/img/comptable.png",
                routerLink:"/distribution/comptabilite",
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
                label:"Reglages",
                iconActive:"assets/img/parametre.png",
                routerLink:"/distribution/reglages",
            },
            {
                label:"Annonces",
                iconActive:"assets/img/iconz4.png",
                routerLink:"/distribution/annonces",
            },
            {
                label:"Utilisateurs",
                iconActive:"assets/img/pm1.png",
                routerLink:"/distribution/utilisateurs",
            },
            {
                label:"Marques",
                iconActive:"assets/img/brand.png",
                routerLink:"/distribution/marques",
                visible: true
            },
            {
                label:"Couleurs",
                iconActive:"assets/img/color.jpg",
                routerLink:"/distribution/couleurs",
                visible: true
            },
            {
                label:"Fournisseurs",
                iconActive:"assets/img/pm5.png",
                routerLink:"/distribution/fournisseurs",
            },
            {
                label:"Notifications",
                iconActive:"assets/img/notification.png",
                routerLink:"/distribution/notifications",
                visible: true
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
        label:"Recruteurs",
        disabled:false,
        visible:true,
        routerLink:"/recruteurs",
        iconDesactive:"assets/img/daydash5.png",
        iconActive:"assets/img/daydash51.png",
        children:[
            {label:"Les recruteurs",iconActive:"assets/img/product.png",routerLink:"/recruteurs",},
            {label:"Les vendeurs",iconActive:"assets/img/vebd.png",},
            {label:"Statistiques",iconActive:"assets/img/pm7.png",},
            {label:"Commande badges",iconActive:"assets/img/certif.png",},
            {label:"Paiements",iconActive:"assets/img/paye.png",},
        ],
        options:[
            {label:"Portefeuille",iconActive:"assets/img/parametre.png",},
            {label:"Annonces",iconActive:"assets/img/iconz4.png",routerLink:"/recruteurs/annonces",},
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