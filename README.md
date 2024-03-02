# Sitecore Hackathon 2024

## Team:  Cloud Aliens

![Cloud Aliens](./images/CloudAliens.png)

## Category
Best Module for XM/XP or XM Cloud - Entertainment Category

## Description
Our hackathon entry introduces an engaging and entertaining module directly within the Sitecore Content Management (CM) interface: a classic Snake game. This module is designed to provide a fun and interactive way for users to spend time while waiting for content publishing processes or simply to take a short break during their workday. 

## Module Purpose
Problem Solved: The publishing process in Sitecore can sometimes be lengthy, leaving users waiting with little to do. Additionally, the work environment can often benefit from light-hearted engagement to improve user experience and satisfaction.

Solution: Our Snake game module offers a delightful distraction for users during wait times, enhancing their overall experience within the Sitecore interface.

## Video
Discover the seamless integration of our classic Snake game right within the Sitecore Content Management interface. Whether you're curious about how to launch the game during those publishing wait times or eager to game action, our video has got you covered.

 - Quick Start Guide: We'll walk you through how to easily access and start the game from the Sitecore interface, ensuring you can dive into the fun without a hitch.

 - Gameplay in Action: Get a firsthand look at the snake slithering through the digital garden, growing with each item it devours. Our video showcases smooth gameplay, intuitive controls, and how the game fits perfectly within your workflow.

[CM Snake - YouTube](https://youtu.be/u5J-l8-q8m8)


## Pre-requisites and Dependencies

To ensure a seamless experience with our Snake game module, the following pre-requisites and dependencies must be met.

### Development Environment
Microsoft Visual Studio 2019 or later, with the ASP.NET and web development workload installed.

### Docker Setup
Ensure Docker Desktop is installed and configured to use Windows containers. This is crucial for running the Sitecore instances required for our module.

### Additional Dependencies
.NET Framework 4.8 SDK or later must be installed for building the project.

Node.js: Required for running any client-side scripts or development tools. We recommend the latest LTS version.

## Usage Instructions

Welcome to the Snake game module for Sitecore, a delightful diversion during your content management tasks. Follow these steps to start playing and join the ranks on the leaderboard!

### How to Launch the Game

1. Click on the **Sitecore logo** in the bottom left corner of the Sitecore interface. This action will reveal the main menu.
2. In the menu that appears, locate and click on the **CMSnake** menu item to "Launch CMSnake".

### Starting the Game

- Once the game interface is open, press **any arrow key** on your keyboard to begin the game. The snake will start moving, and you're now on your way to setting a high score!

### Gameplay Instructions

- **Movement**: Use the **arrow keys** to direct the snake towards the items.

### Interface Guide

- **Game Area**: The central part of the screen where the action happens.
- **Score Display**: Your current score is displayed on the screen, so you know how well you're doing.

## Tips and Tricks

- **Slow and Steady**: As the game progresses and your snake grows, it will get faster. Keep your wits about you and plan your moves.
- **Use the Edges**: The edges of the game area can be your friend, but be careful not to corner yourself!

## Installation Instructions

To run our image with the CMSnake module, follow these instructions:

- Open an **ADMIN terminal**.
- Run the initialization script with the appropriate license path and desired admin password by entering the following command:

   ```powershell
   .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
- After the script completes, restart your terminal to ensure all changes are applied.

- To start up the module, enter the following command and complete the required authenitication steps:

    ```powershell
    .\up.ps1
- Open and build Visual Studio solution CloudAliens.sln

- Publish CMSnake project with folder profile

- Enjoy the experience at https://xmcloudcm.localhost/sitecore/