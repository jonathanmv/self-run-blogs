const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const createBrowser = require("browserless");
// const termImg = require('term-img')
const saveBufferToFile = (buffer, fileName) => {
  const wstream = require("fs").createWriteStream(fileName);
  wstream.write(buffer);
  wstream.end();
};

// First, create a browserless factory
// that it will keep a singleton process running
const browser = createBrowser({
  puppeteer,
});

async function run(urls) {
  // After that, you can create as many browser context
  // as you need. The browser contexts won't share cookies/cache
  // with other browser contexts.
  const browserless = await browser.createContext();

  for (const url of urls) {
    try {
      // Perform the action you want, e.g., getting the HTML markup
      const buffer = await browserless.screenshot(url, {
        device: "iPhone 6",
        viewport: { width: 1024, height: 1024 },
      });
      const fileName = Date.now() + "-screenshot.png";
      saveBufferToFile(buffer, "./downloads/" + fileName);
      console.log(`your screenshot is here: `, fileName);
    } catch (error) {
      console.log("error saving " + url, error);
    }
  }

  // After your task is done, destroy your browser context
  await browserless.destroyContext();

  // At the end, gracefully shutdown the browser process
  await browser.close();
}

const urls = [
  "https://cdn.midjourney.com/3af9edcb-a0d7-4da0-ad7b-2a4d59e81647/0_1.webp",
  "https://cdn.midjourney.com/8c62c35b-b4ce-45b2-8eb8-dff5ff9e319d/0_0.webp",
  "https://cdn.midjourney.com/37a9ef38-825e-49b6-a9a2-c02776f4f3f5/0_1.webp",
  "https://cdn.midjourney.com/b623c520-6d1f-44e5-a055-068a8d96a0cb/0_3.webp",
  "https://cdn.midjourney.com/b2f4a3ad-704e-47d7-8710-28636c66d728/0_2.webp",
  "https://cdn.midjourney.com/f8e088ef-2ebe-4e8c-a7c2-c3b0bc30c486/0_0.webp",
  "https://cdn.midjourney.com/8d607730-e407-4c4a-9854-7b209a1cca19/0_3.webp",
  "https://cdn.midjourney.com/6c2659ad-d6cb-405f-bd05-03aa089d7dca/0_2.webp",
  "https://cdn.midjourney.com/b21d3f8e-fe08-4e90-bd23-b2fa283dc07d/0_0.webp",
  "https://cdn.midjourney.com/43a99e31-b72a-43d7-bfdf-de4ca73df373/0_2.webp",
  "https://cdn.midjourney.com/c4c862a6-53e3-49c4-98c3-a34e84881619/0_1.webp",
  "https://cdn.midjourney.com/f5640bf1-4da9-48a4-ab9f-f06ddd3e3bd4/0_0.webp",
  "https://cdn.midjourney.com/3ba939cb-217f-47a4-9ed5-d6c70924e08b/0_3.webp",
  "https://cdn.midjourney.com/b623c520-6d1f-44e5-a055-068a8d96a0cb/0_3.webp",
  "https://cdn.midjourney.com/16357e47-6741-447b-88f6-a05f0aff0e5c/0_1.webp",
  "https://cdn.midjourney.com/ad6148bb-ef31-4bd7-a130-53443fdf75c1/0_3.webp",
  "https://cdn.midjourney.com/c755b0f3-e91a-4e0d-b922-d5624cd584ae/0_0.webp",
  "https://cdn.midjourney.com/3885fbd7-ed3f-41be-b29b-f2aac3b471fb/0_3.webp",
  "https://cdn.midjourney.com/aecdf5ce-2176-4839-9a57-ee4674b064ad/0_2.webp",
  "https://cdn.midjourney.com/c7a047b7-c1c9-45ac-bdb3-4e1578f53e90/0_2.webp",
  "https://cdn.midjourney.com/3af9edcb-a0d7-4da0-ad7b-2a4d59e81647/0_1.webp",
  "https://cdn.midjourney.com/8c62c35b-b4ce-45b2-8eb8-dff5ff9e319d/0_0.webp",
  "https://cdn.midjourney.com/37a9ef38-825e-49b6-a9a2-c02776f4f3f5/0_1.webp",
  "https://cdn.midjourney.com/79e5ae7d-ee39-4f67-9321-b622b80eb170/0_2.webp",
  "https://cdn.midjourney.com/16a67c57-b596-4bdb-bd10-afebb198801d/0_2.webp",
  "https://cdn.midjourney.com/e435dbed-c80f-414c-974b-76ba30b91130/0_3.webp",
  "https://cdn.midjourney.com/f3796bc7-e412-4652-9b45-597985430f5e/0_1.webp",
  "https://cdn.midjourney.com/d25556f7-3a3d-48f8-9607-4b32bbc5885c/0_0.webp",
  "https://cdn.midjourney.com/0090f9ba-2ac8-4750-ba18-7a24c3004b69/0_1.webp",
  "https://cdn.midjourney.com/860a3cc4-4cd9-4c25-b4e0-7c7d1a3ee7dc/0_2.webp",
  "https://cdn.midjourney.com/8d123b58-272d-480e-be98-c82f7d8cdea9/0_1.webp",
  "https://cdn.midjourney.com/5a725793-7bca-437c-bbdc-66b9fe6078b5/0_3.webp",
  "https://cdn.midjourney.com/fa3cadaf-a1a9-4a35-9ad5-bc04232bba2d/0_0.webp",
  "https://cdn.midjourney.com/9dcd6ea7-1eb2-4e9e-94d5-9999019446e5/0_0.webp",
  "https://cdn.midjourney.com/f819b5b8-105a-4270-bcf2-c06b7e9d00d5/0_2.webp",
  "https://cdn.midjourney.com/f9584f01-a845-4928-b80d-479016e97092/0_1.webp",
  "https://cdn.midjourney.com/121a9de8-2a25-49e4-920d-7c581b1cb372/0_0.webp",
  "https://cdn.midjourney.com/3ace1860-3446-4729-b492-bff55b7eb86c/0_0.webp",
  "https://cdn.midjourney.com/5bb1ecce-7629-4569-a320-e3c7c3bc9733/0_1.webp",
  "https://cdn.midjourney.com/09129807-984e-4b44-b485-f293e05e750c/0_1.webp",
  "https://cdn.midjourney.com/996c61f2-bad9-41d3-aa88-e83a438c65dc/0_3.webp",
  "https://cdn.midjourney.com/a7f3bc68-6685-46c8-a9c5-cd7c5d5e689f/0_0.webp",
  "https://cdn.midjourney.com/4a785c19-2434-4410-9e2d-2d8e720e6b70/0_2.webp",
  "https://cdn.midjourney.com/6ddbf87f-b65b-426c-808e-72c8274f7d52/0_3.webp",
  "https://cdn.midjourney.com/ac177a0c-95bc-454b-b7ac-aa617c7a96c1/0_1.webp",
  "https://cdn.midjourney.com/e47103af-96cd-4e51-858a-ba80447ba060/0_3.webp",
  "https://cdn.midjourney.com/c2e0a4f8-0e77-4bbf-adf3-40f716f07a84/0_0.webp",
  "https://cdn.midjourney.com/a2054798-a01e-43a1-8a89-e8b8015e2d11/0_1.webp",
  "https://cdn.midjourney.com/74e52cb3-e4f3-4bcd-80f1-5f86e12d33f5/0_1.webp",
  "https://cdn.midjourney.com/df118ed3-b49e-494e-afef-3b7cdced4d5f/0_0.webp",
  "https://cdn.midjourney.com/81d562e8-47bd-4565-bf03-9b9bc76e3449/0_3.webp",
  "https://cdn.midjourney.com/a78ebd3d-1241-453a-b905-74079dff4547/0_3.webp",
  "https://cdn.midjourney.com/fad4ff9a-c15a-41b7-9913-aebe7836a31b/0_0.webp",
  "https://cdn.midjourney.com/3140229d-265a-41d4-a070-1a1d2f029ea3/0_1.webp",
  "https://cdn.midjourney.com/b6e3abf0-390f-4b64-be09-52bb57861633/0_0.webp",
  "https://cdn.midjourney.com/1eb357f1-7534-4bc8-8a4c-63554712b036/0_0.webp",
  "https://cdn.midjourney.com/42d16ee5-9bc0-4b33-8734-30412b0b0780/0_1.webp",
  "https://cdn.midjourney.com/c1bf267b-f40a-4d68-868c-deeda4e96c7d/0_0.webp",
  "https://cdn.midjourney.com/88421051-879e-4d55-a15d-6cca76f66bcd/0_0.webp",
  "https://cdn.midjourney.com/08f070ba-57e5-4b44-9890-2e5f77923292/0_1.webp",
  "https://cdn.midjourney.com/f9596bdf-fd6e-4868-9c8b-dafd3cc8a6c4/0_3.webp",
  "https://cdn.midjourney.com/58de26db-d33d-4eeb-8e87-32c583c2c4ca/0_1.webp",
  "https://cdn.midjourney.com/bc45a343-99cb-4783-874f-3d09b22dfb51/0_2.webp",
  "https://cdn.midjourney.com/17dee03e-a96a-4e0d-a33e-e2918f53bda1/0_0.webp",
  "https://cdn.midjourney.com/c760aa20-4831-42b5-ab44-3222de91631f/0_3.webp",
  "https://cdn.midjourney.com/6ddbf87f-b65b-426c-808e-72c8274f7d52/0_3.webp",
  "https://cdn.midjourney.com/ac177a0c-95bc-454b-b7ac-aa617c7a96c1/0_1.webp",
  "https://cdn.midjourney.com/c2e0a4f8-0e77-4bbf-adf3-40f716f07a84/0_0.webp",
  "https://cdn.midjourney.com/e47103af-96cd-4e51-858a-ba80447ba060/0_3.webp",
  "https://cdn.midjourney.com/2be0dae1-a6aa-4a5f-bf70-4fa4d3e67650/0_1.webp",
  "https://cdn.midjourney.com/bc0df6c5-4529-456d-b1ed-eb8b313f1dfc/0_2.webp",
  "https://cdn.midjourney.com/148b5eaa-a295-4cd3-aed0-05a61c4cbdf9/0_1.webp",
  "https://cdn.midjourney.com/5471c1d6-a443-4052-9f09-c7e1ea13b614/0_3.webp",
  "https://cdn.midjourney.com/f712c9e7-6b1b-499e-926b-2a5535305105/0_2.webp",
  "https://cdn.midjourney.com/43b914b3-4f5c-40f1-91f2-8ede33cb16b4/0_2.webp",
  "https://cdn.midjourney.com/c598bf52-8ed3-4b01-8130-ad7443d484b9/0_3.webp",
  "https://cdn.midjourney.com/13f3aceb-8227-4cf4-a05e-fd01917e1405/0_0.webp",
  "https://cdn.midjourney.com/6e6f08dd-db29-4ba0-8ddd-5b8bb78a7a0b/0_0.webp",
  "https://cdn.midjourney.com/6889a97a-4b7e-4554-ad3d-15b9594787eb/0_3.webp",
  "https://cdn.midjourney.com/fbe08a4f-bd0f-41c8-9aa2-e85a01582ddd/0_1.webp",
  "https://cdn.midjourney.com/d448ed46-817b-4696-87c6-cc8bf2cf461b/0_1.webp",
  "https://cdn.midjourney.com/31267908-c112-474d-b3ad-4a79d6e9e0b0/0_3.webp",
  "https://cdn.midjourney.com/a7e56ec5-3c4a-4b7b-bc70-f6b6372963d8/0_3.webp",
  "https://cdn.midjourney.com/4e552735-62d3-4286-a35b-6e393801dad2/0_3.webp",
  "https://cdn.midjourney.com/c5aefe32-5c84-41b2-a2c8-7bbfa7a5570e/0_1.webp",
  "https://cdn.midjourney.com/27774394-5bc5-427e-a551-cfa4712a233f/0_2.webp",
  "https://cdn.midjourney.com/703439bc-85e0-44a6-a438-937350a52e62/0_2.webp",
  "https://cdn.midjourney.com/2be0dae1-a6aa-4a5f-bf70-4fa4d3e67650/0_1.webp",
  "https://cdn.midjourney.com/bc0df6c5-4529-456d-b1ed-eb8b313f1dfc/0_2.webp",
  "https://cdn.midjourney.com/5471c1d6-a443-4052-9f09-c7e1ea13b614/0_3.webp",
  "https://cdn.midjourney.com/148b5eaa-a295-4cd3-aed0-05a61c4cbdf9/0_1.webp",
  "https://cdn.midjourney.com/dddca444-4622-4ab9-bc43-ec7a7b4e9961/0_3.webp",
  "https://cdn.midjourney.com/00dbee0e-1bf7-4265-8e3a-b031a361e041/0_1.webp",
  "https://cdn.midjourney.com/6c3b39ce-1400-408b-b651-2ba02ad8ff21/0_2.webp",
  "https://cdn.midjourney.com/0eb80635-1d58-4944-b539-76d56f95e292/0_1.webp",
  "https://cdn.midjourney.com/d4a9cb48-3a39-441a-abef-e56da26d5c5a/0_1.webp",
  "https://cdn.midjourney.com/5e131867-e6db-4964-a0e0-06ca1c6e2aa4/0_0.webp",
  "https://cdn.midjourney.com/54663685-5b16-4b7f-938f-6862b2b8e03a/0_3.webp",
  "https://cdn.midjourney.com/a5a49361-5eaf-4604-a181-6ccac9127f41/0_0.webp",
  "https://cdn.midjourney.com/eba671da-a347-48cc-9e94-6614081bdcd0/0_1.webp",
  "https://cdn.midjourney.com/42c54544-3e20-4c79-8195-0557e89e26f0/0_3.webp",
  "https://cdn.midjourney.com/9a2a5690-3099-4236-91b0-610775349874/0_1.webp",
  "https://cdn.midjourney.com/37c2c7a1-6b2b-4e81-9e47-abb1c564f66e/0_1.webp",
  "https://cdn.midjourney.com/4ccb4dc9-1e10-45c3-aa43-30c3ba6923eb/0_0.webp",
  "https://cdn.midjourney.com/0eb80635-1d58-4944-b539-76d56f95e292/0_1.webp",
  "https://cdn.midjourney.com/7da45145-4c7c-4a55-94b8-348e18d0a009/0_3.webp",
  "https://cdn.midjourney.com/e79f2ef1-deb8-4331-b5c6-2f9d96133520/0_0.webp",
  "https://cdn.midjourney.com/230526d2-1139-4456-ab75-42e0c629f8ce/0_2.webp",
  "https://cdn.midjourney.com/993ef618-7dc8-45e3-8ebc-e3d5087236fa/0_0.webp",
  "https://cdn.midjourney.com/1c6388ad-fb99-4dde-8e20-6a96ebec1738/0_1.webp",
  "https://cdn.midjourney.com/dddca444-4622-4ab9-bc43-ec7a7b4e9961/0_3.webp",
  "https://cdn.midjourney.com/00dbee0e-1bf7-4265-8e3a-b031a361e041/0_1.webp",
  "https://cdn.midjourney.com/6c3b39ce-1400-408b-b651-2ba02ad8ff21/0_2.webp",
  "https://cdn.midjourney.com/fd0df100-5a22-46ce-9c96-23c39490890a/0_0.webp",
  "https://cdn.midjourney.com/a4103ce9-b754-4ff3-8ca8-996f9cd4993f/0_1.webp",
  "https://cdn.midjourney.com/e0c92436-0bd6-4de2-86d8-6f48092e7650/0_0.webp",
  "https://cdn.midjourney.com/fea39455-cd6b-4962-9994-5c2c592fa307/0_2.webp",
  "https://cdn.midjourney.com/e68fd66b-e023-4f71-8b92-f76dca805ef8/0_0.webp",
  "https://cdn.midjourney.com/c22a5c48-b7e3-421a-a7b4-c4d2f57d2752/0_1.webp",
  "https://cdn.midjourney.com/9d3da32f-026a-4688-996f-017f4c59b5d6/0_0.webp",
  "https://cdn.midjourney.com/886192b7-b818-4247-b29a-ccac48049072/0_1.webp",
  "https://cdn.midjourney.com/2e96a0f6-4e17-4438-9a84-b199be5381bc/0_2.webp",
  "https://cdn.midjourney.com/571e9ecf-491b-4231-845d-1296f894300b/0_2.webp",
  "https://cdn.midjourney.com/f9ffd4b2-1877-47c7-b312-9f49d2a4929a/0_0.webp",
  "https://cdn.midjourney.com/0f3fc9f3-78d6-4e8f-b8d1-86d63cae53aa/0_1.webp",
  "https://cdn.midjourney.com/95b5ec1e-8dc5-485c-9cef-a17d180f8edc/0_0.webp",
  "https://cdn.midjourney.com/1aab5fb4-e85b-4139-8fe6-057ff9ddeda2/0_2.webp",
  "https://cdn.midjourney.com/461aff66-4111-4280-b28b-83e5bea8a685/0_3.webp",
  "https://cdn.midjourney.com/fc79620f-2a65-4a4c-8402-9b300d325ecd/0_3.webp",
  "https://cdn.midjourney.com/ee9acfa9-f400-4c48-aa93-f992c0373393/0_1.webp",
  "https://cdn.midjourney.com/fd0df100-5a22-46ce-9c96-23c39490890a/0_0.webp",
  "https://cdn.midjourney.com/fde48a3f-1908-43f3-9fa4-03585a5219df/0_3.webp",
  "https://cdn.midjourney.com/739009d6-9203-4475-bb7d-dc5fdf2203f1/0_0.webp",
  "https://cdn.midjourney.com/a4103ce9-b754-4ff3-8ca8-996f9cd4993f/0_1.webp",
  "https://cdn.midjourney.com/e0c92436-0bd6-4de2-86d8-6f48092e7650/0_0.webp",
  "https://cdn.midjourney.com/fea39455-cd6b-4962-9994-5c2c592fa307/0_2.webp",
  "https://cdn.midjourney.com/f3823fa0-e3a2-4d98-8dfe-9f5d7ddbb051/0_2.webp",
  "https://cdn.midjourney.com/e214d0b6-ff39-4c9d-a670-7fe26959cc9a/0_3.webp",
  "https://cdn.midjourney.com/ee27cc1f-bece-4621-801d-f9cd7e558e49/0_2.webp",
  "https://cdn.midjourney.com/1e859f1c-4335-43e4-a0f4-10d4f062242c/0_1.webp",
  "https://cdn.midjourney.com/f64f3e6f-3a86-4260-a08f-de4b2bd268e6/0_2.webp",
  "https://cdn.midjourney.com/0cd105ef-aa72-4797-a727-015a90b53abd/0_3.webp",
  "https://cdn.midjourney.com/48830b4b-e701-4157-9728-923110faef87/0_1.webp",
  "https://cdn.midjourney.com/c23459b1-591b-473b-a077-d4141873eeac/0_0.webp",
  "https://cdn.midjourney.com/ad86daf2-390f-4f68-81f3-37e9c7bf9bf0/0_1.webp",
  "https://cdn.midjourney.com/f7120c65-705d-426e-b83a-9cc10c82e2e3/0_3.webp",
  "https://cdn.midjourney.com/d1d0a74d-72a4-40b3-abb4-3c4e6c4bd1b3/0_2.webp",
  "https://cdn.midjourney.com/3906cc34-ba73-48f3-b3ed-6e45eb553958/0_2.webp",
  "https://cdn.midjourney.com/8b39f747-f38c-4428-8ae4-c2f487c30015/0_1.webp",
  "https://cdn.midjourney.com/8a792778-12a5-4a12-8dc1-c146ed8b86fa/0_1.webp",
  "https://cdn.midjourney.com/0436ac12-cd4c-442b-a4b7-4e95a12acb57/0_1.webp",
  "https://cdn.midjourney.com/c0893637-de68-4ddb-a551-5670bfd04151/0_0.webp",
  "https://cdn.midjourney.com/2310cee6-86f8-47d8-8ad4-909c4e96f1c1/0_0.webp",
  "https://cdn.midjourney.com/0d8d217b-a38f-467e-85d6-dac2daea6498/0_2.webp",
  "https://cdn.midjourney.com/f3823fa0-e3a2-4d98-8dfe-9f5d7ddbb051/0_2.webp",
  "https://cdn.midjourney.com/ee27cc1f-bece-4621-801d-f9cd7e558e49/0_2.webp",
  "https://cdn.midjourney.com/1e859f1c-4335-43e4-a0f4-10d4f062242c/0_1.webp",
  "https://cdn.midjourney.com/e214d0b6-ff39-4c9d-a670-7fe26959cc9a/0_3.webp",
  "https://cdn.midjourney.com/93408dab-6d32-4266-a665-d5a7c0d11530/0_3.webp",
  "https://cdn.midjourney.com/f3823fa0-e3a2-4d98-8dfe-9f5d7ddbb051/0_2.webp",
  "https://cdn.midjourney.com/e214d0b6-ff39-4c9d-a670-7fe26959cc9a/0_3.webp",
  "https://cdn.midjourney.com/ee27cc1f-bece-4621-801d-f9cd7e558e49/0_2.webp",
  "https://cdn.midjourney.com/1e859f1c-4335-43e4-a0f4-10d4f062242c/0_1.webp",
  "https://cdn.midjourney.com/f64f3e6f-3a86-4260-a08f-de4b2bd268e6/0_2.webp",
  "https://cdn.midjourney.com/0cd105ef-aa72-4797-a727-015a90b53abd/0_3.webp",
  "https://cdn.midjourney.com/48830b4b-e701-4157-9728-923110faef87/0_1.webp",
  "https://cdn.midjourney.com/c23459b1-591b-473b-a077-d4141873eeac/0_0.webp",
  "https://cdn.midjourney.com/ad86daf2-390f-4f68-81f3-37e9c7bf9bf0/0_1.webp",
  "https://cdn.midjourney.com/f7120c65-705d-426e-b83a-9cc10c82e2e3/0_3.webp",
  "https://cdn.midjourney.com/d1d0a74d-72a4-40b3-abb4-3c4e6c4bd1b3/0_2.webp",
  "https://cdn.midjourney.com/3906cc34-ba73-48f3-b3ed-6e45eb553958/0_2.webp",
  "https://cdn.midjourney.com/8b39f747-f38c-4428-8ae4-c2f487c30015/0_1.webp",
  "https://cdn.midjourney.com/8a792778-12a5-4a12-8dc1-c146ed8b86fa/0_1.webp",
  "https://cdn.midjourney.com/0436ac12-cd4c-442b-a4b7-4e95a12acb57/0_1.webp",
  "https://cdn.midjourney.com/c0893637-de68-4ddb-a551-5670bfd04151/0_0.webp",
  "https://cdn.midjourney.com/2310cee6-86f8-47d8-8ad4-909c4e96f1c1/0_0.webp",
  "https://cdn.midjourney.com/0d8d217b-a38f-467e-85d6-dac2daea6498/0_2.webp",
  "https://cdn.midjourney.com/f3823fa0-e3a2-4d98-8dfe-9f5d7ddbb051/0_2.webp",
  "https://cdn.midjourney.com/ee27cc1f-bece-4621-801d-f9cd7e558e49/0_2.webp",
  "https://cdn.midjourney.com/1e859f1c-4335-43e4-a0f4-10d4f062242c/0_1.webp",
  "https://cdn.midjourney.com/e214d0b6-ff39-4c9d-a670-7fe26959cc9a/0_3.webp",
  "https://cdn.midjourney.com/93408dab-6d32-4266-a665-d5a7c0d11530/0_3.webp",
  "https://cdn.midjourney.com/79e5ae7d-ee39-4f67-9321-b622b80eb170/0_2.webp",
  "https://cdn.midjourney.com/16a67c57-b596-4bdb-bd10-afebb198801d/0_2.webp",
  "https://cdn.midjourney.com/e435dbed-c80f-414c-974b-76ba30b91130/0_3.webp",
  "https://cdn.midjourney.com/f3796bc7-e412-4652-9b45-597985430f5e/0_1.webp",
  "https://cdn.midjourney.com/d25556f7-3a3d-48f8-9607-4b32bbc5885c/0_0.webp",
  "https://cdn.midjourney.com/0090f9ba-2ac8-4750-ba18-7a24c3004b69/0_1.webp",
  "https://cdn.midjourney.com/860a3cc4-4cd9-4c25-b4e0-7c7d1a3ee7dc/0_2.webp",
  "https://cdn.midjourney.com/8d123b58-272d-480e-be98-c82f7d8cdea9/0_1.webp",
  "https://cdn.midjourney.com/5a725793-7bca-437c-bbdc-66b9fe6078b5/0_3.webp",
  "https://cdn.midjourney.com/fa3cadaf-a1a9-4a35-9ad5-bc04232bba2d/0_0.webp",
  "https://cdn.midjourney.com/9dcd6ea7-1eb2-4e9e-94d5-9999019446e5/0_0.webp",
  "https://cdn.midjourney.com/f819b5b8-105a-4270-bcf2-c06b7e9d00d5/0_2.webp",
  "https://cdn.midjourney.com/f9584f01-a845-4928-b80d-479016e97092/0_1.webp",
  "https://cdn.midjourney.com/121a9de8-2a25-49e4-920d-7c581b1cb372/0_0.webp",
  "https://cdn.midjourney.com/3ace1860-3446-4729-b492-bff55b7eb86c/0_0.webp",
  "https://cdn.midjourney.com/5bb1ecce-7629-4569-a320-e3c7c3bc9733/0_1.webp",
  "https://cdn.midjourney.com/09129807-984e-4b44-b485-f293e05e750c/0_1.webp",
  "https://cdn.midjourney.com/996c61f2-bad9-41d3-aa88-e83a438c65dc/0_3.webp",
  "https://cdn.midjourney.com/a7f3bc68-6685-46c8-a9c5-cd7c5d5e689f/0_0.webp",
  "https://cdn.midjourney.com/4a785c19-2434-4410-9e2d-2d8e720e6b70/0_2.webp",
  "https://cdn.midjourney.com/d59728ab-8c09-422a-b1c9-2928f43908b0/0_3.webp",
  "https://cdn.midjourney.com/7de808f4-7628-4aec-a076-53406278ad8a/0_0.webp",
  "https://cdn.midjourney.com/206e17e5-b651-46b3-b061-0bea90ad1c4d/0_1.webp",
  "https://cdn.midjourney.com/f8d9aab0-c732-4553-a5f7-1d41ea3e9e4e/0_1.webp",
  "https://cdn.midjourney.com/f03eac8b-df1f-4231-9c04-4183f6af4261/0_0.webp",
  "https://cdn.midjourney.com/05f204c5-f97f-4a9b-8645-55a171c33302/0_0.webp",
  "https://cdn.midjourney.com/d9150562-2db7-4397-80d7-2b021c3c7936/0_1.webp",
  "https://cdn.midjourney.com/23e0cb75-e98a-4677-8f3d-972f0f15d5c4/0_0.webp",
  "https://cdn.midjourney.com/fd3f2ac7-7e35-489c-b06b-90c99f95c115/0_3.webp",
  "https://cdn.midjourney.com/3fe30c8b-2ad9-43e0-a9a8-6ff4fab396e6/0_0.webp",
  "https://cdn.midjourney.com/21805a21-f126-40af-8992-fbec3bdc6f09/0_2.webp",
  "https://cdn.midjourney.com/87224ac5-f586-4467-b08b-0cfdbda9fec3/0_1.webp",
  "https://cdn.midjourney.com/1e8863ea-aa12-47f5-bc0a-0f1dfdea995c/0_3.webp",
  "https://cdn.midjourney.com/58ef725c-635c-4d09-909b-34fdee97596e/0_1.webp",
  "https://cdn.midjourney.com/f8d9aab0-c732-4553-a5f7-1d41ea3e9e4e/0_1.webp",
  "https://cdn.midjourney.com/007b10bc-d431-4a7a-9d13-b6a69ef0c566/0_3.webp",
  "https://cdn.midjourney.com/b1f33685-5486-4219-a671-d176ad6f9721/0_1.webp",
  "https://cdn.midjourney.com/2a66bfc3-9be1-4ecb-b674-b97c657785b3/0_3.webp",
  "https://cdn.midjourney.com/871708fd-2104-4bb7-9ae6-7322fa7d23d5/0_0.webp",
  "https://cdn.midjourney.com/1f4282ad-a942-40b0-8d24-a4abd9395b26/0_1.webp",
  "https://cdn.midjourney.com/9ec3d483-b50b-4c8d-97dd-c8fb5ec71907/0_2.webp",
  "https://cdn.midjourney.com/d59728ab-8c09-422a-b1c9-2928f43908b0/0_3.webp",
  "https://cdn.midjourney.com/7de808f4-7628-4aec-a076-53406278ad8a/0_0.webp",
  "https://cdn.midjourney.com/206e17e5-b651-46b3-b061-0bea90ad1c4d/0_1.webp",
  "https://cdn.midjourney.com/c586097e-c640-4a49-ad70-4bb85ff81af1/0_0.webp",
  "https://cdn.midjourney.com/734e501d-44c5-4f4f-8ded-4e334b56663b/0_2.webp",
  "https://cdn.midjourney.com/24509083-01b4-4511-bc86-1ed6bf676ec2/0_1.webp",
  "https://cdn.midjourney.com/ec93369b-ed28-42fa-bcd4-1db31f8abbbc/0_2.webp",
  "https://cdn.midjourney.com/a5d99cb5-6bff-435c-8c76-a354255b9dcb/0_0.webp",
  "https://cdn.midjourney.com/bbca1ec1-b578-4c2a-82b8-8dd87fcc1265/0_0.webp",
  "https://cdn.midjourney.com/fdad9e75-72a9-4cee-9fe0-27bc8f8cbe58/0_2.webp",
  "https://cdn.midjourney.com/734e501d-44c5-4f4f-8ded-4e334b56663b/0_3.webp",
  "https://cdn.midjourney.com/3a033b8e-5e32-4dac-a3f5-599887c298a9/0_0.webp",
  "https://cdn.midjourney.com/ec93369b-ed28-42fa-bcd4-1db31f8abbbc/0_1.webp",
  "https://cdn.midjourney.com/7a3af72b-65e7-40f5-9347-46c03713c180/0_1.webp",
  "https://cdn.midjourney.com/f622b512-1ebe-4fc7-9a8c-53e1e6dc902d/0_0.webp",
  "https://cdn.midjourney.com/13b66463-ec2d-4ef3-8a5d-fafdd26cbd2a/0_2.webp",
  "https://cdn.midjourney.com/42deb440-ebf4-43c8-ae34-a1f1fdc5c308/0_1.webp",
  "https://cdn.midjourney.com/a799dd5a-35e8-4918-9944-1e60109cc166/0_2.webp",
  "https://cdn.midjourney.com/4409af93-1f20-47a3-ba57-05c19e6dde33/0_2.webp",
  "https://cdn.midjourney.com/f0033807-4db4-4cbe-abf5-0d9b78eb6cf7/0_3.webp",
  "https://cdn.midjourney.com/438cb26b-4c88-4000-aa98-27c081bfc2bd/0_1.webp",
  "https://cdn.midjourney.com/d62a4094-5531-40f2-ac4a-b8e7ef5b192b/0_3.webp",
  "https://cdn.midjourney.com/2fed39e7-d64d-4884-986e-62886384457e/0_2.webp",
  "https://cdn.midjourney.com/ec93369b-ed28-42fa-bcd4-1db31f8abbbc/0_2.webp",
  "https://cdn.midjourney.com/7bd28dcf-dbd5-4377-be92-967f3dac39a3/0_0.webp",
  "https://cdn.midjourney.com/7c45fff0-b882-48e2-a461-48873f3d5069/0_3.webp",
  "https://cdn.midjourney.com/c586097e-c640-4a49-ad70-4bb85ff81af1/0_0.webp",
  "https://cdn.midjourney.com/734e501d-44c5-4f4f-8ded-4e334b56663b/0_2.webp",
  "https://cdn.midjourney.com/24509083-01b4-4511-bc86-1ed6bf676ec2/0_1.webp",
  "https://cdn.midjourney.com/5afe5753-15a2-471e-9ee3-39852c2e0e27/0_2.webp",
  "https://cdn.midjourney.com/d52d14d4-69c1-44e3-9e7d-72cd96559b40/0_1.webp",
  "https://cdn.midjourney.com/a784af27-155a-476f-9199-98a382c65ce6/0_3.webp",
  "https://cdn.midjourney.com/8c875f0a-5b6c-40f7-b9a0-fd30371b7d07/0_0.webp",
  "https://cdn.midjourney.com/ace5dace-df1a-4522-8090-ad6e891e8845/0_0.webp",
  "https://cdn.midjourney.com/5ab526ce-2854-4c4e-bd4a-2c6bc05b9d4d/0_0.webp",
  "https://cdn.midjourney.com/f90a7b1e-ab83-4e88-97fb-9014b09447a0/0_3.webp",
  "https://cdn.midjourney.com/0012f5a9-7065-4a22-850d-ebcb9d1243c8/0_2.webp",
  "https://cdn.midjourney.com/312bbf84-5025-4544-9a10-b5a0b8776439/0_1.webp",
  "https://cdn.midjourney.com/6340c8c1-8d80-4766-a851-bb9f42656d67/0_3.webp",
  "https://cdn.midjourney.com/13de004f-ed37-42a7-add1-5cc36f3092d1/0_0.webp",
  "https://cdn.midjourney.com/0ec1cc20-91d2-4e30-8fa7-cf1475fa01fc/0_3.webp",
  "https://cdn.midjourney.com/f97bbce8-da3a-4f6c-bb09-af61db77fc6c/0_0.webp",
  "https://cdn.midjourney.com/dfb42ed4-d105-4521-b810-a9531335cfe8/0_2.webp",
  "https://cdn.midjourney.com/3bf3cd61-ac09-4fc8-8735-1c75debe9fd1/0_1.webp",
  "https://cdn.midjourney.com/1897cbdd-6d33-4d2f-9e9d-2419447bcd83/0_3.webp",
  "https://cdn.midjourney.com/53986d3b-a38d-4560-a191-dfd621d0221c/0_3.webp",
  "https://cdn.midjourney.com/6bdf68d1-768f-440b-b02f-d6fbd94ceefb/0_3.webp",
  "https://cdn.midjourney.com/883f366f-32ca-496e-8648-ffc99b82fd6b/0_0.webp",
  "https://cdn.midjourney.com/eb6bae45-a982-4492-9d01-942b9070d005/0_1.webp",
  "https://cdn.midjourney.com/52df2cc1-c604-4741-9409-caf755ac9aa3/0_3.webp",
  "https://cdn.midjourney.com/aca8e3ac-191a-4400-8837-eb23c6f25a0e/0_0.webp",
  "https://cdn.midjourney.com/5afe5753-15a2-471e-9ee3-39852c2e0e27/0_2.webp",
  "https://cdn.midjourney.com/d52d14d4-69c1-44e3-9e7d-72cd96559b40/0_1.webp",
  "https://cdn.midjourney.com/a784af27-155a-476f-9199-98a382c65ce6/0_3.webp",
  "https://cdn.midjourney.com/8c875f0a-5b6c-40f7-b9a0-fd30371b7d07/0_0.webp",
  "https://cdn.midjourney.com/1f3733a7-33ac-4d8f-9b04-5d0ae60bbe15/0_1.webp",
  "https://cdn.midjourney.com/434cd080-e593-4b64-88bb-ac4937546edb/0_0.webp",
  "https://cdn.midjourney.com/6ffb16eb-1c11-4902-8afb-cbb288f46154/0_1.webp",
  "https://cdn.midjourney.com/59eface5-4852-43e5-8d0a-a9e9302a8821/0_0.webp",
  "https://cdn.midjourney.com/c29b3d13-1f90-48a6-b3bb-ee470a506837/0_3.webp",
  "https://cdn.midjourney.com/0176b37c-6a0e-4594-a68e-d76df7007de3/0_0.webp",
  "https://cdn.midjourney.com/5b228dfb-a588-45bf-9154-66165476cd9f/0_2.webp",
  "https://cdn.midjourney.com/5556345b-985c-4fd6-99ca-0310132b6ab2/0_2.webp",
  "https://cdn.midjourney.com/f3a883e6-59ca-4015-b4ed-e08703fdc95e/0_3.webp",
  "https://cdn.midjourney.com/c7c2bae4-eb1f-4829-9918-5222a241a73d/0_1.webp",
  "https://cdn.midjourney.com/d3481e7a-4ecb-4cc9-b7ee-1d8342457981/0_3.webp",
  "https://cdn.midjourney.com/ff31fcfb-7fa6-48dd-90b0-dab3ae6dfd2b/0_2.webp",
  "https://cdn.midjourney.com/b3206adf-7605-4c22-b6ed-c2c1ce120632/0_3.webp",
  "https://cdn.midjourney.com/53494a10-2dfb-4ce9-a0ef-66e807d9638e/0_3.webp",
  "https://cdn.midjourney.com/96868e9e-6f68-4d3a-98b1-9f30e27aa628/0_0.webp",
  "https://cdn.midjourney.com/f3cae45d-aad2-48f1-98ac-454c5a878ab7/0_1.webp",
  "https://cdn.midjourney.com/79efa0bd-ac91-4328-90c9-d368e83eb9e8/0_3.webp",
  "https://cdn.midjourney.com/d8657276-84b6-4087-a04c-2fcef93eb64e/0_2.webp",
  "https://cdn.midjourney.com/8763f1ce-03d2-40ed-9bef-4cd05bd52adc/0_0.webp",
  "https://cdn.midjourney.com/268c750b-1fc5-4de8-a381-40208a2230c9/0_0.webp",
  "https://cdn.midjourney.com/b51298f6-5dfc-4c46-bff0-03a1d3cdc0fe/0_3.webp",
  "https://cdn.midjourney.com/1f3733a7-33ac-4d8f-9b04-5d0ae60bbe15/0_1.webp",
  "https://cdn.midjourney.com/434cd080-e593-4b64-88bb-ac4937546edb/0_0.webp",
  "https://cdn.midjourney.com/59eface5-4852-43e5-8d0a-a9e9302a8821/0_0.webp",
  "https://cdn.midjourney.com/6ffb16eb-1c11-4902-8afb-cbb288f46154/0_1.webp",
];

run(urls)
  .then(() => console.log("done"))
  .catch((e) => console.error(e))
  .finally(() => process.exit());
