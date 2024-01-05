<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div style="text-align: center;">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Downloads][downloads-shield]][downloads-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<div style="text-align: center;">

![Version Master][masterVersion-shield]
![Version Development][devVersion-shield]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging">
    <img src="images/firebase.png" alt="Logo" width="80">
    <img src="images/node.png" alt="Logo" width="80">
  </a>

<h3 align="center">FCM Custom Node</h3>

  <p align="center">
    A simple node that sends messages to the Firebase Cloud Messaging Service of Google to send notifications to a token or a topic.
    <br />
    <a href="https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/issues">Report Bug</a>
    ·
    <a href="https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![FCM Custom Node Screen Shot][product-screenshot]

This package is used to communicate with Firebase Cloud Messaging. It allows to send messages to the FCM service by token or topic in a simple manner.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   [![NodeJS][Node.js]][Node-url]
-   [![NodeRed][Node-red]][NodeRed-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## The Nodes

![FCM Custom Node][customNodes-screenshot]

There are 2 nodes included with this contrib
| Node | Purpose |
| ------------------ | -------------------------------------------------------- |
| FCMConfing | Config node used to store the connection information |
| FCM | Sends messages to FCM |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to use?

-   From Manage Palette

Find this package `@iorsan/red-contrib-firebase-notification` and click install.

-   Install Manually  
    Rememeber to restart Node RED after using this method.  
    `.node-red` is usually relative to the users home directory that is running Node RED.

```bash
cd ~/.node-red
npm install @iorsan/red-contrib-firebase-notification --omit=dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authentication Methods

-   `Custom Token` (Generated with Private Key)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started Link

-   [Installing][starting-url]: System requirements and install instructions
-   [Generate key][generateKey-url]: How to generate the json key to authenticate
-   [Wiki][wiki-url]: Just about everything
-   [Firebase Site][firebase-url]: What is Firebase?
-   [Change Log](CHANGELOG.md): Whats changed?

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [ ] Add testing

See the [open issues](https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE][license-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - ismael.ortega.works@gmail.com

Project Link: [https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging](https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Put your name here before making a pull request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging.svg?style=for-the-badge
[contributors-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging.svg?style=for-the-badge
[forks-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/network/members
[stars-shield]: https://img.shields.io/github/stars/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging.svg?style=for-the-badge
[stars-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/stargazers
[issues-shield]: https://img.shields.io/github/issues/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging.svg?style=for-the-badge
[issues-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/issues
[license-shield]: https://img.shields.io/github/license/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging.svg?style=for-the-badge
[license-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/blob/master/LICENSE
[downloads-shield]: https://img.shields.io/npm/dm/@iorsan/red-contrib-firebase-notification?style=for-the-badge
[downloads-url]: https://github.com/ismaelOrtega14/red-contrib-firebase-notification?activeTab=versions
[masterVersion-shield]: https://img.shields.io/github/package-json/v/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/master?style=for-the-badge
[devVersion-shield]: https://img.shields.io/github/package-json/v/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/development?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ismaelortega
[product-screenshot]: images/screenshot.jpeg
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Node-red]: https://img.shields.io/badge/Node--RED-%238F0000.svg?style=for-the-badge&logo=node-red&logoColor=white
[NodeRed-url]: https://nodered.org/
[customNodes-screenshot]: images/customNodes.png
[starting-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/wiki/getting-started
[generateKey-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/wiki/generate-key
[wiki-url]: https://github.com/ismaelOrtega14/node-red-contrib-firebase-cloud-messaging/wiki
[firebase-url]: https://firebase.google.com/
