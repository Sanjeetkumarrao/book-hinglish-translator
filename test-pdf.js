import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

async function testPdf() {
  const filePath = 'C:/Users/Sanjeet Kumar Rai/Downloads/Sanjeet_Kumar_Rao_Resume_1.pdf';

  if (!fs.existsSync(filePath)) {
    console.error("PDF file path par nahi mili! Check file path.");
    return;
  }

  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  try {
    console.log("PDF parse route ko test kar rahe hain...");
    const response = await axios.post('http://localhost:3000/api/parse-pdf', formData, {
      headers: formData.getHeaders(),
    });

    console.log("\n--- PDF PARSE SUCCESS ---");
    console.log("Total Pages:", response.data.totalPages);
    console.log("Total Chunks:", response.data.totalChunks);
    console.log("First Chunk Sample:\n", response.data.chunks[0]?.substring(0, 200) + "...");
  } catch (error) {
    console.error("Test Error:", error.response?.data || error.message);
  }
}

testPdf();