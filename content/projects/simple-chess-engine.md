---
author: "femto"
date: 2019-03-25
linktitle: Simple Chess Engine
title: Simple Chess Engine
weight: 10
featured_image: "/img/schess.png"
---

## Introduction
This is a simple implementation of a chess program with minimax algorithm and alpha-beta pruning.

Namely, chess engine at its core.

## Features
- Complete Chess Game
- ASCII Interface
- Evaluation Function
- Artificial Intelligence
    - Minimax Algorithm
    - Alpha-beta Pruning

## Architecture
- Board Representation
- Move Generation
- Move Search
- Move Evaluation

## Components
### Board Representation
- Board class
- Piece class
- Square class
- Move class
- Move List class

### Move Generation Function
Board class routine
- GenerateMoves(MoveList &moves)

### Move Search Function
AI class routine Alpha-beta Pruning
- FindBestMove()
- Search(int alpha, int beta, int level)

### Move Evaluation Function
#### Materiality
- Pawn    1
- Knight  3
- Bishop  3
- Rook    5
- Queen   9
- King    999

Material Balance = Number of Pieces * Piece Value
Mobility = Sum of Legal Moves
    
#### Evaluation Function
Utility = (Own Mobility - Opponent Mobility) + Material Balance * 100

## Download
[Simple Chess Engine](https://github.com/jsusaki/schess)

## Resources
[Chess Programming Wiki](https://www.chessprogramming.org/)