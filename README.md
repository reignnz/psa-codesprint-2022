<img src="public/logo.svg">

# PSAccess :mag:

## About :blue_book:

PSAccess is an all inclusive one-stop mobile-optimized web portal for the digitizing of Pass Out Notes (PONs). PSA uses PONs to manage the outflow of items such as spare parts, scrap material disposal, etc. For each PON, 3 printed hard copies are required and this results in **large amounts of waste and significant carbon footprint**. PSAccess aims to reduce this wastage and streamline the item outflow process by digitizing PONs, keeping everything in the cloud. This brings the following benefits:

1. Reduction in paper usage
1. Increased convenience
1. Heightened security (strict permissions imposed prevents unauthorized access)
1. Speed up the overall PON process
1. Reduce physical storage required for archiving and audits

## Team Members :busts_in_silhouette:

- [Yu Long](https://github.com/yulonglim)
- [Kenneth Chow](https://github.com/reignnz)
- [Kai Jun](https://github.com/nujiak)
- [Myron](https://github.com/meerian)

## Project :memo:

### Project Name: :closed_lock_with_key:

__PSAccess__ - A website to digitize the process of using Pass Out Note (PON) system in PSA.

### Problem Statement :speech_balloon:

Currently, the process of using POS system in PSA is not environmentally sustainable and error-prone. The process involves the following steps:

1. Request for PON from a designated officer.
2. Fill up the PON and 2 carbon copies are also required.
3. Submit the PON to a counter signing officer (CSO) for verification and signing.
4. Submit the PON to an AETOS officer for a final verification and archival of the PON

The process is error-prone because the PON is a physical document that can be lost or tampered with. The process is also not environmentally sustainable because the PON is a physical document that is printed.

### Proposed Solution :bulb:

We propose to digitize the process of using POS system in PSA. The proposed solution involves the following steps:

1. Request for PON from a designated officer on the website.
2. Designated officer will approve the request and the PON will be generated.
3. The PON can be filled up on the website.
4. The PON can be shared to a CSO for verification and signing.
5. The PON can be shared to an AETOS officer for a final verification and archival of the PON.

The proposed solution is less error-prone because the PON is a digital document that can be easily edited and shared. The proposed solution is also more environmentally sustainable because the PON is a digital document that is not printed.

# How To Use :closed_book:

## Prerequisites :grey_question:
- Internet connection is required to use the website.
- Initial setup requires an admin account to be created with sufficiently strong password.

## Initial Setup :computer:
1. Got to [PSAccess]() to create an admin account.
2. An admin account is required to create other accounts.
3. Roles of the accounts are as follows:
    - Admin: Can create other accounts and view system metrics.
    - Staff: Can request for PON or verify and sign PONs.
    - Designated Officer (DO): Can issue PONs.
    - AETOS Officer (AO): Can verify and archive PONs.

## Requesting for PON :raising_hand:
1. Staff can login to the website.
2. Click on the `Request PON` button.
3. Wait for the designated officer to approve the request.

## Issuing PON :office:
1. Designated officer can login to the website.
2. A list of PON requests will be shown.
3. Click on the `Issue PON` button beside the request to issue the PON.

## Filling up the PON :pencil:
1. Staff can login to the website.
2. The staff can access the issued PON by clicking on the item.
3. There will be text fields for the staff to fill up the PON.
4. Once the PON is filled up, the staff can click on the `Submit` button to submit the PON and wait for the CSO to verify and sign the PON.

## Verifying and Signing PON :black_nib:
1. CSO (another staff) can login to the website.
2. The CSO can access the PON by clicking on the item.
3. The CSO would be able to verify the PON and sign the PON.

## Verifying and Archiving PON :cop:
:warning:YET TO BE IMPLEMENTED :warning:
1. AETOS officer can login to the website.
2. The AETOS officer can access the PON by clicking on the item.
3. The AETOS officer would be able to verify the PON and archive the PON.

## Other Resources: :ledger:
Object-Class diagrams: [Lucid Chart](https://lucid.app/lucidchart/75730a74-03c5-473b-8e6a-645ce68dafbf/edit?invitationId=inv_42d0eedb-2664-4afe-b6f0-13cb832c8d03#)

UI Design and mockups:  [Figma](https://www.figma.com/file/684nDpzEBmhjsDABpbPrKL/PSA-Codesprint-2022-UI%2FUX?node-id=0%3A1)
