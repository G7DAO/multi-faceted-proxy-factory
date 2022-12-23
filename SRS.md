# Software Requirements Specification
ISO/IEC/IEEE 29148:2018 Software Requirements Specification

## For Multi-Faced Proxy factory

Version 0.1  
Prepared by [SuperG7DAO](#)  
G7DAO
December 14th, 2022  

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
  * 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * 1.4 [References](#14-references)
  * 1.5 [Document Overview](#15-document-overview)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Perspective](#21-product-perspective)
  * 2.2 [Product Functions](#22-product-functions)
  * 2.3 [Product Constraints](#23-product-constraints)
  * 2.4 [User Characteristics](#24-user-characteristics)
  * 2.5 [Assumptions and Dependencies](#25-assumptions-and-dependencies)
  * 2.6 [Apportioning of Requirements](#26-apportioning-of-requirements)
* 3 [Requirements](#3-requirements)
  * 3.1 [External Interfaces](#31-external-interfaces)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Functional](#32-functional)
  * 3.3 [Quality of Service](#33-quality-of-service)
    * 3.3.1 [Performance](#331-performance)
    * 3.3.2 [Security](#332-security)
    * 3.3.3 [Reliability](#333-reliability)
    * 3.3.4 [Availability](#334-availability)
  * 3.4 [Compliance](#34-compliance)
  * 3.5 [Design and Implementation](#35-design-and-implementation)
    * 3.5.1 [Installation](#351-installation)
    * 3.5.2 [Distribution](#352-distribution)
    * 3.5.3 [Maintainability](#353-maintainability)
    * 3.5.4 [Reusability](#354-reusability)
    * 3.5.5 [Portability](#355-portability)
    * 3.5.6 [Cost](#356-cost)
    * 3.5.7 [Deadline](#357-deadline)
    * 3.5.8 [Proof of Concept](#358-proof-of-concept)
* 4 [Verification](#4-verification)
* 5 [Appendixes](#5-appendixes)

## Revision History
| Name | Date    | Reason For Changes  | Version   |
| -----|---------|---------------------|-----------|
| SuperGnus | 12/14/2023 | Initial Document submitted | .9 |


## 1. Introduction
> This document contains information on the Multi-Faceted Proxy Factory code for the G7DA) and Game7 Community

### 1.1 Document Purpose
This requirements document is geared towards developers that want to implement EIP-2535 (upgradable) based contracts.

### 1.2 Product Scope
The scope of this document includes how the Diamond proxy contract works and samples of "facets" that can be added to the Diamond system.

### 1.3 Definitions, Acronyms and Abbreviations
 * SRS - Software Requirements Specification (this document)
 * OpenZeppelin - Base contracts that have been audited
 * OpenZeppelin-Diamond - Transpiled contracts that leverage the audited OpenZeppelin
 * EIP-2535 - Ethereum ERC Standard for using Diamond Proxy and Upgradable plugin Contracts (Facets)

### 1.4 References
 * [EIP-2535 Proposal](https://eips.ethereum.org/EIPS/eip-2535)
 * [OpenZeppelin Diamonds](https://github.com/GeniusVentures/openzeppelin-contracts-diamond)
 * [OpenZeppelin Transpiler for Diamonds](https://github.com/GeniusVentures/openzeppelin-transpiler)
 * [Template Diamond Proxy Contract](https://github.com/mudgen/diamond-2-hardhat.git)

## 3. Requirements (TODO)
### 3.1 External Interfaces (TODO)
#### 3.1.1 User interfaces (TODO)
#### 3.1.2 Hardware interfaces (TODO)
#### 3.1.3 Software interfaces (TODO)
### 3.2 Functional (TODO)
### 3.3 Quality of Service (TODO)
#### 3.3.1 Performance (TODO)
#### 3.3.2 Security
#### 3.3.3 Reliability
#### 3.3.4 Availability
### 3.4 Compliance
### 3.5 Design and Implementation

#### 3.5.1 Installation
Constraints to ensure that the software-to-be will run smoothly on the target implementation platform.

#### 3.5.2 Distribution
Constraints on software components to fit the geographically distributed structure of the host organization, the distribution of data to be processed, or the distribution of devices to be controlled.

#### 3.5.3 Maintainability
Specify attributes of software that relate to the ease of maintenance of the software itself. These may include requirements for certain modularity, interfaces, or complexity limitation. Requirements should not be placed here just because they are thought to be good design practices.

#### 3.5.4 Reusability
<!-- TODO: come up with a description -->

#### 3.5.5 Portability
Specify attributes of software that relate to the ease of porting the software to other host machines and/or operating systems.

#### 3.5.6 Cost
Specify monetary cost of the software product.

#### 3.5.7 Deadline
Specify schedule for delivery of the software product.

#### 3.5.8 Proof of Concept
<!-- TODO: come up with a description -->

## 4. Verification
> This section provides the verification approaches and methods planned to qualify the software. The information items for verification are recommended to be given in a parallel manner with the requirement items in Section 3. The purpose of the verification process is to provide objective evidence that a system or system element fulfills its specified requirements and characteristics.

<!-- TODO: give more guidance, similar to section 3 -->
<!-- ieee 15288:2015 -->

## 5. Appendixes
