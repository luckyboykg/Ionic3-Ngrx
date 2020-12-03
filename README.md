# Ionic3 Ngrx
This project is an example to apply NgRx in Ionic 3.

Dependencies :

Ionic 3, ngrx/effects: 5.2.0, @ngrx/store: 5.2.0, jasmine : 2.99.0, karma : 1.7.1, typescript : 2.6.2


## MVC Architecture

-Follows the bidirectional flow.

-No concept of store.

-Controller handles entire logic.

-Debugging is difficult due to bidirectional flow.

-Shines well in both client-side or server-side frameworks.

![alt text](https://www.tutorialsteacher.com/Content/images/mvc/mvc-architecture.png)

MVC is well-known for its three-layer development architecture and it divides applications into three components:

Model: maintains the data and behavior of an application

View: displays the model in the UI

Controller: handles the user request and serves as an interface between View & Model components

Whenever the controller receives the request from the user, it uses the appropriate Model & View and generates the response sending it back to the user.

## Flux Architecture

-Follows the unidirectional flow.

-Includes multiple stores.

-Store handles all logic.

-Ensures simple debugging with the dispatcher.

-Supports client-side framework.

![alt text](https://lh6.googleusercontent.com/Dm5Ge_yI8JFDBrTd__NLI-UirqyNMVcJTWGno7kQXbwcP9qLMOyKMDPp0uoQIRoADRrKMomOFBNxdiQg26YVXSfYzKlSj9mc0R532ImyU7M23MgKa1lJUS2hEP9PxmcHrb-OPqjjVHA)

The Flux architecture is based on the following components:

Action: enables data passing to the dispatcher

Dispatcher: call actions & updates to stores

Store: serves as a container for the app state & logic

View: same as the view in MVC architecture


When a user clicks on something, the view creates Actions. 
Action can create new data (or mofidy existing data) and send it to the Dispatcher. 

The Dispatcher then dispatches the action with payload to the appropriate Store. 
The Store updates the state based on the payload and notifies an update to the View.


## Redux Architecture

-Follows the unidirectional flow.

-Includes single store.

-Reducer handles all logic.

-Single store makes debugging lot easier.

-Supports client-side framework.

![alt text](https://lh4.googleusercontent.com/8x2u1K_k8yuhW0YEaKJTSeN18M35ilAG5wKKnP91cS6TI9d6vhhd-gCqdoQr0HL5IGTO1JD6JWGlHJp8LoIAdp3xL5CS70YTH5RgRWp94_FlnhQKfTutQVthyxCRuKrRWzNHYljKESg)

Redux is a library, which implements the idea of Flux but in quite a different way. 

Redux architecture introduces new components like:

Reducer: Logic that decides how your data changes in pure functions

Centralized Store: Holds a state object which is the state of the entire app

In Redux architecture, application event is denoted as an Action, which is dispatched to the Reducer (the pure function).
Then the Reducer updates the Centralized Store with new data based on the kind of Action it receives.
Store creates a new state and notifies an update to the View.


Flux and Redux don’t encourage bi-directional flow to ensure clean data flow architecture. The significant benefit of a unidirectional approach is that since the data flows through your application in a single direction you can have better control over it.

Reference:
https://www.clariontech.com/blog/mvc-vs-flux-vs-redux-the-real-differences

## NGRX library
-Implement Redux Architecture

![alt text](https://lh6.googleusercontent.com/c0NfQ3-FuyhRCviYqXuoD_5-FXuVulrNUIZ_JvLk48CjXXwkBdJtuOMdkgpqzQE8ToMSCkE9JG8ZKfPOSkmDkxENLWx5h4CKe_RZQaLQ513InI5LONPpaowuLum8zleDFDJ0OkjZM80)


Data flow in NGRX:

![alt text](https://lh5.googleusercontent.com/MNcki6oUyEYiJ1oZUCl8VW44QhVb2ujGYKskKCjUdwo2m-HfI9VIktW6AaSExOaSBUv81XtPauNJ-ENhOcpswVvdCF-eomn2HuaVrC-c5KCwk-tofIb5BxAcveKpnygtSdpvRRewj-c)

# Pros:

## Centralized, Immutable State

Single source of truth.

The data lives in a single store so it is easier to manage, debug and inspect.

![alt text](https://lh6.googleusercontent.com/IXrYSc3SD3C_UUZu95usGMFNTgV4eELXEkqQqGV_RsmxvPMBNyIMPmSEPW24u_J43qNfPkvdnaI5ComF6HISEkzt2p6ZqWxcU0J8qIu-iiJLghV3VeSlTMw3MbCxhVsDqu3Ae07DWyA)

## Immutable State

State is read-only

All components have to dispatch Action to get or set any data from the Store.

So we can manage all the changes in our system and avoid the side effect. 

## Share State

State can share across many components. 

We can minimize the risk of sharing variables, services between multiple components.

## Components will shorter and cleaner

Component just need to binding data from the State.

It helps us very easy to maintain Component and Service.

## Performance

NgRx doesn't change the State directly, it just returns the new State when has anything changed (it's called Immutable State).

So we can apply ChangeDetectionStrategy.OnPush to maximize performance for Angular App.

>Read more about ChangeDetectionStrategy.OnPush : https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

## Testability

All state updates are handled by pure functions and they are extremely simple to test. 

>Read more about Pure Functions: https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c

# Cons:

-Not officially supported by Angular or Ionic.

-Developer has to spend more time and effort to learn new technology as Redux pattern, NgRx or NGXS library.

-“BOILERPLATE” code, we need to writing more code and touch multiple files to get a simple feature working.

-Not suitable for small applications with less than 5 screens.
