import { Assets } from "react-navigation-stack";
var image
const categories = [
  {
    id: "plants",
    name: "Plants",
    tags: ["products", "inspirations"],
    count: 147,
    image: require("../assets/icons/plants.png")
  },
 /* {
    id: "seeds",
    name: "Seeds",
    tags: ["products", "shop"],
    count: 16,
    image: require("../assets/icons/seeds.png")
  },
  {
    id: "flowers",
    name: "Flowers",
    tags: ["products", "inspirations"],
    count: 68,
    image: require("../assets/icons/flowers.png")
  },
  {
    id: "sprayers",
    name: "Sprayers",
    tags: ["products", "shop"],
    count: 17,
    image: require("../assets/icons/sprayers.png")
  },
  {
    id: "pots",
    name: "Pots",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/pots.png")
  },
 {
    id: "fertilizers",
    name: "fertilizers",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/fertilizers.png")
  },
  {
    id: "KidsFriendly",
    name: "Kids Friendly",
    tags: ["products", "shop"],
    count: 5,
    image: require("../assets/icons/fertilizers.png")
  }*/
];
printImage=(name)=>{
  image= "assets/images/"+name+".jpg", 
  <Avatar
    rounded
    source={{
      uri: this.state.image,
    }}
    size={"xlarge"}
    onPress={() => this.selectPicture()}
    showEditButton
  />
}
getDescripption=(name)=>{
  db.collection("KidsFriendly").where("name","==", name).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      this.setState({
        "description" : doc.data().description
      })
    });
  })
  }
const products = [
  {
    id: 1,
    name:printImage() ,
    description:this.state.description,
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png")
    ]
  }
];

const explore = [
  // images
  require("../assets/images/explore_1.png"),
  require("../assets/images/explore_2.png"),
  require("../assets/images/explore_3.png"),
  require("../assets/images/explore_4.png"),
  require("../assets/images/explore_5.png"),
  require("../assets/images/explore_6.png")
];

const profile = {
  username: "",
  location: "please customise",
  email: firebase.auth().currentUser.email,
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

export { categories, explore, products, profile };
