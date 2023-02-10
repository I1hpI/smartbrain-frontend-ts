import React, { Component } from 'react';


import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

export interface IUser {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}
export interface IBoxes{
  leftCol: number,
  topRow: number,
  rightCol: number,
  bottomRow: number,
  id?:string
  gee:number
}
interface IAppProps {
}

interface IAppState{
  input:string;
  imageUrl:string;
  boxes: [IBoxes];
  bees: number,
  route: string;
  isSignedIn: boolean;
  user: IUser;
}
const initialState: IAppState = {
      input: '',
      imageUrl: '',
      // box: {},
      boxes: [{
        leftCol: 0,
        topRow: 0,
        rightCol: 0,
        bottomRow: 0,
        gee:0
      }],
      bees:0,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    
}

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '34328149c0364c63836c81223ed30c4d'
});

class App extends Component<IAppProps, IAppState> {
  // initial state of the app 
  constructor(props:IAppProps) {
    super(props);
    this.state=initialState;
    // this.state = JSON.parse(window.localStorage.getItem('state')) || {
   
  }
  // setState(state) {
  //   window.localStorage.setItem('state', JSON.stringify(this.loadUser));
  //   super.setState(state);
  // }

  // updates the data received into the state
  loadUser = (data:any):void => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
// calculation code for only one face 
  // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputimage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }
  calculateFaceLocation = (data:any) => {
    const image:any = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map((face:any) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        gee:data.outputs[0].data.regions.length,
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  // displayFaceBox = (box) => {
  //   this.setState({box: box});
  // }
  displayFaceBox = (boxes:[IBoxes]) => {
    this.setState({boxes: boxes});
    console.log('apple', boxes[0].gee);
    this.setState({bees:boxes[0].gee});
   
  }


  onInputChange = (event:React.FormEvent<HTMLInputElement>) => {
    this.setState({input:  event.currentTarget.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
   
  
    // Old Way:
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

    // New Way:
    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then((response:any) => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              // this.setState(Object.assign(this.state.user, { entries: count}))
              this.setState({user:{...this.state.user, entries: count}})
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch((err:any) => console.log(err));
  }
  // function to change the route according to the string
  onRouteChange = (route:string) => {
    if (route === 'signout') {
      // isSignedIn is used here to display whether the top right corner has signin, register or signout 
      // this is later passed down to navigation component
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    // updating the state of route
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, bees } = this.state;
    return (
      <div className="App">
       {/* passing down the state property and function as props   */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
       {/* here if route is home display logo, rank, imagelinkform and facerecognition components */}
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
               
              />
              <ImageLinkForm
                
                bees={bees}
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition    boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
            // else display signin
             route === 'signin'
             ? <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            //  else display register
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );  
  }
}

export default App;
