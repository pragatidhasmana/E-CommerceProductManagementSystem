namespace E_CommerceProductManagementSystem.Utils
{
    public class ImageUpload
    {
        public string imageFileServerPath = @"C:\ParitoshWorkspace\13 Jan Dotnet+React Training\POC\EcomEasyImageServer\public";
        public string Upload(IFormFile file)
        {
            string filePath;

            string imagespath = Directory.GetCurrentDirectory();
            
            List<string> validExtensions = new List<string>() { ".jpg",".jpeg", ".png", "gif" };
            if (file != null)
            {
                string fileExtension = Path.GetExtension(file.FileName);

                if (!validExtensions.Contains(fileExtension))
                {
                    return "invalid extension";
                }

                

                string fileName = Guid.NewGuid().ToString() + fileExtension;
                string productimagePath = Path.Combine(imagespath, @"Images\Products");
                string productimageFileServerPath = Path.Combine(imageFileServerPath, @"Images\Products");



                using (var fileStream = new FileStream(Path.Combine(productimagePath, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                using (var fileStream = new FileStream(Path.Combine(productimageFileServerPath, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                filePath = @"\Images\Products\" + fileName;
                return filePath;
            }
            return "File Not Found";
        }

        public void DeleteFile(string oldpath)
        {

            string imagespath = Directory.GetCurrentDirectory();

            var oldImagePath = Path.Combine(imagespath, oldpath.TrimStart('\\'));

            var oldImageServerPath = Path.Combine(imageFileServerPath,oldpath.TrimStart('\\'));

            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }

            if (System.IO.File.Exists(oldImageServerPath))
            {
                System.IO.File.Delete(oldImageServerPath);
            }

            return;
        }
    }
}
