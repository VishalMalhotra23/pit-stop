import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { create as ipfsHttpClient } from 'ipfs-http-client';
//@ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
import teams from '../data/teams.json';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import { useDispatch } from 'react-redux';
import { getGarageSuccess } from '../store/garage/actions';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function useNFT() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function uploadMetaDataToIPFS(teamKey: string) {
    const data = JSON.stringify({
      name: teams.find((t) => t.key === teamKey)?.name,
      image: `https://ipfs.infura.io/ipfs/${
        teams.find((t) => t.key === teamKey)?.livery
      }`,
      points: 0
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      console.log(url);
      return url;
    } catch (error) {
      console.log('Error uploading data: ', error);
    }
  }

  async function mintNFT(teamKey: string) {
    const url = await uploadMetaDataToIPFS(teamKey);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      // @ts-ignore
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      signer
    );
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    console.log(tx);

    router.push('/garage');
    fetchMintedNFTs();
  }

  async function fetchMintedNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      // @ts-ignore
      process.env.NEXT_PUBLIC_NFT_ADDRESS,
      NFT.abi,
      signer
    );

    const data = await contract.fetchNFTs();

    console.log(data);

    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await contract.tokenURI(i);
        const meta = await axios.get(tokenUri);

        let item = {
          itemId: i.toNumber(),
          image: meta.data.image,
          name: `${meta.data.name} #${i}`,
          points: meta.data.points
        };
        return item;
      })
    );

    dispatch(getGarageSuccess(items));
  }

  return {
    mintNFT,
    fetchMintedNFTs
  };
}
