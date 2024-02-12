const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNjM0MDRmOC1hODI4LTQxNTItODFlNS1iOGIzMzM3YTZkNzciLCJlbWFpbCI6InRpcGhhaW5lLmthY2hrYWNoaUBlZHUuZGV2aW5jaS5mciIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwM2QyMmUwNWE1MzEzNjBjZGIzZSIsInNjb3BlZEtleVNlY3JldCI6IjkyY2RlYjVjY2QxYTE0NmM5ZDFiNmJkYjYzZjAxMGRjOWU0YzQzOGJlMGVmYmY3MjUzYWVlMGU4N2VhNjYzNmQiLCJpYXQiOjE3MDc3NTE5MDV9.ZNelWKIbb7RnVp68AtiOmUKSm1PIKFC1eAGAQE9jWL4'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "Chaton.jpeg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS()