using System.Collections.Generic;
using System.Collections.ObjectModel;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class MakeResource : KeyValuePairResource
    {
        public ICollection<KeyValuePairResource> Models { get; set; }

        /*
         * Initialize the collection of Models so that we don't get a null reference exception
         */
        public MakeResource()
        {
            Models = new Collection<KeyValuePairResource>();
        }
    }
}