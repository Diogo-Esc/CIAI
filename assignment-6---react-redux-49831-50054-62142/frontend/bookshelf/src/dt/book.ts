export interface Book {
    id: number;
    authors: Author[];
    title: string;
    // owner: String;
    // description: String;
    images?: Image[];
    // reviews: Review[];
}

export interface Author {
    name: string
}

export interface Image {
    url: string
}

export interface Review {
    rating: number;
    text: String;
    user: String;
}

export interface RdxBookState {
    data:Book[],
    filter:string,
    loading:boolean
  }

export  const initialBookState: RdxBookState =
{ data: [
//     {
//     id: 0,
//     authors: [{name: "Frank Herbert"}],
//     title: "Dune",
//     // owner: "Rocky",
//     // description: "Before The Matrix, before Star Wars, before Ender's Game and Neuromancer, there was Dune: winner of the prestigious Hugo and Nebula awards, and widely considered one of the greatest science fiction novels ever written.\nMelange, or 'spice', is the most valuable - and rarest - element in the universe; a drug that does everything from increasing a person's life-span to making intersteller travel possible. And it can only be found on a single planet: the inhospitable desert world Arrakis.\nWhoever controls Arrakis controls the spice. And whoever controls the spice controls the universe.\nWhen the Emperor transfers stewardship of Arrakis from the noble House Harkonnen to House Atreides, the Harkonnens fight back, murdering Duke Leto Atreides. Paul, his son, and Lady Jessica, his concubine, flee into the desert. On the point of death, they are rescued by a band for Fremen, the native people of Arrakis, who control Arrakis' second great resource: the giant worms that burrow beneath the burning desert sands.\nIn order to avenge his father and retake Arrakis from the Harkonnens, Paul must earn the trust of the Fremen and lead a tiny army against the innumerable forces aligned against them.\nAnd his journey will change the universe.",
//     images: [{url: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3409/9780340960196.jpg"}],
//     // reviews: [
//     //     {
//     //         rating: 5,
//     //         text: "best book",
//     //         user: "John Smith"
//     //     },
//     //     {
//     //         rating: 2,
//     //         text: "worst book",
//     //         user: "Mary Rose"
//     //     }
//     // ]
// },
// {
//     id: 1,
//     authors: [{name: "Coleen Hoover"}],
//     title: "It Ends With Us",
//     // owner: "Rocky",
//     // description: "A brave and heartbreaking novel that digs its claws into you and doesn't let go, long after you've finished it' Anna Todd, author of the After series 'A glorious and touching read, a forever keeper' USA Today 'Will break your heart while filling you with hope' Sarah Pekkanen, Perfect Neighbors SOMETIMES THE ONE WHO LOVES YOU IS THE ONE WHO HURTS YOU THE MOST. Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. She's come a long way from the small town in Maine where she grew up - she graduated from college, moved to Boston, and started her own business. So when she feels a spark with a gorgeous neurosurgeon named Ryle Kincaid, everything in Lily's life suddenly seems almost too good to be true. Ryle is assertive, stubborn, maybe even a little arrogant. He's also sensitive, brilliant, and has a total soft spot for Lily, but Ryle's complete aversion to relationships is disturbing. Even as Lily finds herself becoming the exception to his 'no dating' rule, she can't help but wonder what made him that way in the first place. As questions about her new relationship overwhelm her, so do thoughts of Atlas Corrigan - her first love and a link to the past she left behind. He was her kindred spirit, her protector. When Atlas suddenly reappears, everything Lily has built with Ryle is threatened. With this bold and deeply personal novel, It Ends With Us is a heart-wrenching story and an unforgettable tale of love that comes at the ultimate price.",
//     images: [{url: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4711/9781471156267.jpg"}],
//     // reviews: [
//     //     {
//     //         rating: 5,
//     //         text: "best book",
//     //         user: "John Smith"
//     //     },
//     //     {
//     //         rating: 1,
//     //         text: "worst book",
//     //         user: "Mary Rose"
//     //     }
//     // ]
// },
// {
//     id: 2,
//     authors: [{name: "Mo Xiang Tong Xiu"}],
//     title: "Heaven Official's Blessing",
//     // owner: "Rocky",
//     // description: "Born the crown prince of a prosperous kingdom, Xie Lian was renowned for his beauty, strength, and purity. His years of dedication and noble deeds allowed him to ascend to godhood. But those who rise, can also fall...and fall he does, cast from the Heavens again and again and banished to the mortal realm. Eight hundred years after his mortal life, Xie Lian has ascended to godhood for the third time. Now only a lowly scrap collector, he is dispatched to wander the earthly realm to take on tasks appointed by the heavens to pay back debts and maintain his divinity. Aided by old friends and foes alike, and graced with the company of a mysterious young man with whom he feels an instant connection, Xie Lian must confront the horrors of his past in order to dispel the curse of his present.",
//     images: [{url: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6482/9781648279171.jpg"}],
//     // reviews: [
//     //     {
//     //         rating: 5,
//     //         text: "best book",
//     //         user: "John Smith"
//     //     },
//     //     {
//     //         rating: 1,
//     //         text: "worst book",
//     //         user: "Mary Rose"
//     //     }
//     // ]
// },
],
  filter:"",
  loading:false
}