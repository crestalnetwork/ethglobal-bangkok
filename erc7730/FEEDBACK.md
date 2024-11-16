# Feedback for Ledger clear signing (ERC-7730) docs

## Suggestions

### 1. Build a better onboarding flow for a new protocol metadata

Currently, the entry point of [getting started](https://developers.ledger.com/docs/clear-signing/erc7730) involves specific instructions to understand what ERC-7730 is, and how to validate/test a new metadata.

What's missing is a full guide to build a new protocol's metadata
* Start by giving a bare minimal template
* Then explain how to analyze an existing contract's abi (by going to Etherscan for the easiest access)
* Based on each kind of contract function, explain how it gets converted to the different fields in the metadata output
* Talk about special cases and how to create common display formats, and give specific examples
* Explain how to validate both the format, and how to get it to work with a local Ledger device without having to merge the PR into the registry

### 2. Build better tools to quickly scale the number of metadata files

Currently, the only tool of metadata creation is [python-erc3370](https://github.com/LedgerHQ/python-erc7730) and its capabilities are also limited (in its current stage).

Some features this tool can be expanded with:
* Generate the base template based on ABI, but leave the optional fields open for users to fill in either through an interactive UI
* Support a new markup syntax - you can mark certain fields in ABI as "required" or "excluded" 
* Allow comparing two ABIs to figure out diffs, if diff is small, maybe each upgrade of the same contract can re-use a common calldata metadata

### 3. Consider a different approach from maintaining a centralized registry with JSON schema metadata

There are a few downsides of the current approach:
* Generating a new metadata for a new protocol is not straightforward, even with added tooling
* Approving support through PR reviews will slow down protocol acceptance as the team will reach a point that reviewing speed would not catch up with the proposals
* JSON schema is a great way for validation but is (along with OpenAPI) tougher to maintain without proper autogen tools and IDEs
* There is a security risk of attacking this single repo to compromise the intents, as the ideal place to put the registry is to decentralize its storage and governance

Potential new approaches for consideration:
* Propose a way to mark/hint params directly inside Solidity files, similar to how Godoc (Golang) is generated from
* Propose having each individual team adopt a new tool to generate "attached" metadata and decentralize its storage and search functionalities
* No-code app to mark intents and their required fields through an intuitive UI, then export and save to registry
