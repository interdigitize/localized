import React, { Component } from 'react';
import Navigation from './components/navigation.jsx';
import dummydata from './dummydata';
import Footer from './components/Footer.jsx';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import UploadMedia from './components/UploadMedia.jsx';
import PostsContainer from './components/PostsContainer.jsx';
import FamiliesContainer from './components/FamiliesContainer.jsx';

var posts = [{ 'image': 'http://static.dnaindia.com/sites/default/files/2016/05/22/462997-arya-stark-in-game-of-thrones-season-6-epiosde-5-the-door.jpg',
  'title': 'arya',
  'description': 'me'
}, { 'image': 'https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg',
  'title': 'kittycat',
  'description': 'baby'
}, { 'image': 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
  'title': 'kitten',
  'description': 'smally'
}, { 'image': 'https://vignette3.wikia.nocookie.net/xmenmovies/images/6/6b/Hugh-Jackman.jpg/revision/latest?cb=20120222054319',
  'title': 'brother in law',
  'description': 'hugh'
}, { 'image': 'http://akns-images.eonline.com/eol_images/Entire_Site/2017527/rs_600x600-170627125434-600.Scarlett-Johansson-Hair.jl.062717.jpg?downsize=300:*&crop=300:300;left,top',
  'title': 'aunt',
  'description': 'scarlett'
}, { 'image': 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/15/09/jon-snow.jpg',
  'title': 'cousin',
  'description': 'jon'
}, { 'image': 'http://michael-fassbender-online.net/wp-content/themes/awake/lib/scripts/timthumb/thumb.php?src=http://michael-fassbender-online.net/wp-content/uploads/2015/08/MF-Tux.jpg&w=980&h=420&zc=1&q=100',
  'title': 'uncle',
  'description': 'michael'
}, { 'image': 'http://www.star2.com/wp-content/uploads/2016/03/harry_shum_jr_a_p-e1431739786837-770x470.jpg',
  'title': 'brother',
  'description': 'harry'
}, { 'image': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Kate_Winslet_at_The_Dressmaker_event_TIFF_%28headshot%29.jpg',
  'title': 'stepsister',
  'description': 'kate'
}, { 'image': 'http://www.trbimg.com/img-586555ff/turbine/la-en-st-1229-issa-rae-20161228',
  'title': 'sister',
  'description': 'issa'
}, { 'image': 'https://i.pinimg.com/736x/e2/e1/c9/e2e1c923f41b3cd650141a68745c434f--eva-mendes-style-prom-hairstyles.jpg',
  'title': 'wife',
  'description': 'eva'
}, { 'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Ed_Norton_Shankbone_Metropolitan_Opera_2009.jpg/220px-Ed_Norton_Shankbone_Metropolitan_Opera_2009.jpg',
  'title': 'brother',
  'description': 'ed'
}, { 'image': 'https://media1.s-nbcnews.com/j/newscms/2017_21/1216209/salma-hayek-hair-today-inline-001-170522_243d723cbe725b08ee6f2022670207b5.today-inline-large.jpg',
  'title': 'sister',
  'description': 'selma'
}
];

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Layout style={{flexDirection: 'row'}}>
          <Navigation />
          <Layout style={{flexDirection: 'column'}}>
            <Content style={{ background: '#fff', padding: 5 }}>
              <FamiliesContainer />
            </Content>
            <Content style={{ background: '#f9f9f9', padding: 10 }}>
              <UploadMedia />
            </Content>
            <Content style={{background: '#f1f1f1', padding: 5, minHeight: 800}}>
              <PostsContainer posts={posts}/>
            </Content>
          </Layout>
        </Layout>
        <Footer />
      </div>
    );
  }
}

export default Index;
