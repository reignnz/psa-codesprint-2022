<img src="">

<p align="center">
  <img width="640"src="public/logo.svg" alt="PSAccess logo">
</p>

# PSAccess :mag:

## About :blue_book:

PSAccess is an all inclusive one-stop mobile-optimized web portal for the digitizing of Pass Out Notes (PONs). PSA uses PONs to manage the outflow of items such as spare parts, scrap material disposal, etc. For each PON, 3 printed hard copies are required and this results in **large amounts of waste and significant carbon footprint**. PSAccess aims to reduce this wastage and streamline the item outflow process by digitizing PONs, keeping everything in the cloud. This brings the following benefits:

1. Reduction in paper usage
1. Increased convenience
1. Heightened security (strict permissions imposed prevents unauthorized access)
1. Speed up the overall PON process
1. Reduce physical storage required for archiving and audits

### Team Members :busts_in_silhouette:

- [Yu Long](https://github.com/yulonglim)
- [Kenneth Chow](https://github.com/reignnz)
- [Kai Jun](https://github.com/nujiak)
- [Myron](https://github.com/meerian)

## Project :memo:

### Problem Statement :speech_balloon:

Our project is the answer to the following problem statement:

> Currently, the process of using POS system in PSA is not environmentally sustainable and error-prone. The process involves the following steps:
> 
> 1. Request for PON from a designated officer.
> 2. Fill up the PON and 2 carbon copies are also required.
> 3. Submit the PON to a counter signing officer (CSO) for verification and signing.
> 4. Submit the PON to an AETOS officer for a final verification and archival of > the PON

This process is extremely unsustainable as three hard-copies of the PON is required for redundancy and archival. This leads to excessive waste and significant carbon footprint.

This process is also error-prone because the PON is a physical document that can be lost or tampered with. 

### Our Proposed Solution :bulb:

We propose to digitize the process of passing-out items in PSA. The proposed solution involves the following steps:

1. PSA staff requests for ePON from a designated officer on the portal.
2. Designated officer will approve the request and a PON with a unique identification number will be generated.
3. The ePON is filled up by the requester on the portal.
4. The ePON is shared with another staff for signing as a Counter Signing Officer.
5. The ePON can then be shared to an AETOS officer for a final verification and subsequent archival of the ePON.

The proposed solution is less error-prone because the PON is a digital document that can be easily edited and shared. The proposed solution is also more environmentally sustainable because the PON is a digital document that is not printed.

## How To Use :closed_book:

PSAccess is designed to reproduce the workflow of the physical PON while shedding the physical work of printing and handing over printed papers.

Every user in PSAccess are assigned one of the following roles:

1. Staff (request, edit, countersign)
2. Designated Officer (view request, issue ePON)
3. AETOS (verify ePON)

Each user can also be an Admin account, which gives them the permission to create new users.

### Prerequisites :grey_question:

Only a mobile phone or computer with internet access and a web browser is required to access the website. 

### Initial Setup :computer:

An admin account is required to create other regular user accounts. Our implementation allows you to access a special admin portal to create an admin account. **This portal is only for testing and evaluation purposes, it will not (and should not) be implemented in production.**

If you would like to create an admin account, go to the [admin creation portal](https://psaccess.nujiak.com). 

### Using PSAccess

In this section we detail a guide for each of the roles to perform their respective tasks. 

The main site can be found at: https://psaccess.nujiak.com.

#### Admin

Enrolling new users

1. Click the Enrol button on the top right of the site 
2. Fill in the details for the user
3. Click submit. 

The server will generate an 8 digit alphanumeric password for the account which is to be issued to the user. Write this password down as it will not be shown again. The user can reset their password after logging in.

#### Staff

Requesting for a PON :raising_hand::

1. After logging into the website, click on the *Request* button
2. Wait for the designated officer to approve the request

Filling up the PON :pencil::

1. Once the DO issues the PON, it will show up on the staff's homepage
2. Click the PON to access it
3. Click the pencil icon at the top right of each card to edit the fields
4. Once the PON is filled up, scroll down and click the *Submit* button
5. Share the PON with other staff for countersigning using the *Share* button
5. Wait for the other staff to countersign the the PON
6. Should the countersigning officer reject the PON, start from step 2 to resubmit the PON

Countersigning :black_nib::

1. Once a PON is shared with you, it will appear on your homepage under *Shared with you*.
2. Click the shared PON to open it
3. After assessing the PON, scroll to the bottom and click on "Accept" or "Reject"

Sharing with AETOS officer:

1. Refer to step 5 above to share the PON with the AETOS officer. You will need to know their username on PSAccess.

#### Designated Officer

Issuing PON :office::
1. After logging into PSAccess, you will see a list of PON requests with their details
2. Click on the request to issue the PON.

#### AETOS Officer

Verifying and Signing PON :black_nib::
1. CSO (another staff) can login to the website.
2. The CSO can access the PON by clicking on the item.
3. The CSO would be able to verify the PON and sign the PON.

Verifying and Archiving PON :cop::    
:warning: This feature is yet to be implemented :warning:
1. Log into PSAccess
2. You will see the PON shared with you under *Shared with you*
3. Scroll to the bottom and click "Verify" to verify and archive the PON.

## Deployment

In this section we detail the steps required to deploy PSAccess locally to try it out. Note that you can always access https://psaccess.nujiak.com to acces our prototype implementation.

### Prerequisites

1. A PostgreSQL database. This can be set up with services like Heroku, AWS RDS or Supabase.
1. Nodejs and `npm`
1. Git installed locally

### Steps

1. Clone this git repository to your local drive using git:

```
git clone https://github.com/reignnz/psa-codesprint-2022.git
```
2. Run `npm install` to ensure you have all required modules
3. Create `.env` on the root folder. You can follow the format in `dotenv-sample`
4. Run `npx prisma generate` to generate the required files for Prisma
5. Run `npm run dev` to run the development server
6. Access `localhost:3000` in your browser

## Other Resources: :ledger:

Object-Class diagrams: Available on [Lucid Chart](https://lucid.app/lucidchart/75730a74-03c5-473b-8e6a-645ce68dafbf/edit?invitationId=inv_42d0eedb-2664-4afe-b6f0-13cb832c8d03#)

UI Design and mockups:  Available on [Figma](https://www.figma.com/file/684nDpzEBmhjsDABpbPrKL/PSA-Codesprint-2022-UI%2FUX?node-id=0%3A1)
