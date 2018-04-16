using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Models;

namespace vega.Core.Models
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage storage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage storage)
        {
            this.storage = storage;
            this.unitOfWork = unitOfWork;
        }
        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
        {
            var fileName = await storage.StorePhoto(uploadsFolderPath, file);

            var photo = new Photo
            {
                FileName = fileName
            };

            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}