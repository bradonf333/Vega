using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IPhotoRepository photoRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(
            IHostingEnvironment host,
            IVehicleRepository repository,
            IPhotoRepository photoRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.photoRepository = photoRepository;
            this.host = host;
        }

        [HttpGet]
        public async Task<IEnumerable<PhotosResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotosAsync(vehicleId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotosResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicleAsync(vehicleId, includeRelated : false);
            if (vehicle == null)
            {
                return NotFound();
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("File is null or Empty.");
            }
            if (file.Length > photoSettings.MaxBytes)
            {
                return BadRequest("Maximum file size exceeded.");
            }
            if (!photoSettings.IsSupportedFileType(file.FileName))
            {
                return BadRequest("Invalid file type.");
            }

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo
            {
                FileName = fileName
            };

            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            var photoResult = mapper.Map<Photo, PhotosResource>(photo);
            return Ok(photoResult);

        }
    }
}