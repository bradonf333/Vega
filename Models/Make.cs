using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Models
{
    public class Make
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }

        /*
         * Initialize the collection of Models so that we don't get a null reference exception
         */
        public Make()
        {
            Models = new Collection<Model>();
        }
    }
}