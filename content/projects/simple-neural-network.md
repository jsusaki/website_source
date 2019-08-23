---
author: "femto"
date: 2019-04-25
linktitle: Simple Neural Network
title: Simple Neural Network
weight: 10
featured_image: "/img/simple-neural-network.png"
---

## Introduction
This is a simple neural network to solve classic non-linear XOR (exclusive) problem.

## Problem
XOR problem is a classic non-linear classification problem where you take 2 binary inputs and output either 0 or 1 depending on the combination of input.
Here, we want to output the correct classification of XOR where:

| Input 1| Input 2 | Output |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Input Matrix X
| Input 1| Input 2 |
|:-:|:-:|
| 0 | 0 |
| 0 | 1 |
| 1 | 0 |
| 1 | 1 |

### Output Matrix y
| Output |
|:-:|
| 0 |
| 1 |
| 1 |
| 0 |

## Solution
To solve XOR classification problem, we will use the neural network algorithm which is universal non-linear function approximator to correctly classify the XOR output.
We will implement the simplest architecture to solve this problem.

## Architecture
### Input Layer
2 input neurons

### Hidden Layer
2 hidden neurons

### Output Layer
1 output neuron

## Components
### Feedforward
#### Activation Function
- Sigmoid Function s(x) = 1 / 1 + e^-x

#### Loss Function
- Squared Error E = truth - prediction

### Backpropagation
#### Optimization Algorithm
- Gradient Descent W += Delta

## Future Update
- Create a tutorial explaining underlying mathematical concepts, algorithms and code.
- Design and implement OOP neural network.
- Design Neural Network to solve Image Classification Problem

## Download
[Simple Neural Network](https://github.com/jsusaki/snn)

## Resources
[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/)

[A Neural Network in 11 lines of Python](http://iamtrask.github.io/2015/07/12/basic-python-network/)

[Hacker's guide to Neural Networks](http://karpathy.github.io/neuralnets/)

[Deep Learning Book](https://www.deeplearningbook.org/)
