-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2016 at 02:23 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_theatre`
--

-- --------------------------------------------------------

--
-- Table structure for table `upcomingmovies`
--

DROP TABLE IF EXISTS `upcomingmovies`;
CREATE TABLE IF NOT EXISTS `upcomingmovies` (
  `upMovieId` int(15) NOT NULL,
  `upMovieName` varchar(50) NOT NULL,
  `upReleaseDate` varchar(20) NOT NULL,
  `upPosterPath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`upMovieId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `upcomingmovies`
--

INSERT INTO `upcomingmovies` (`upMovieId`, `upMovieName`, `upReleaseDate`, `upPosterPath`) VALUES
(328429, 'Approaching the Unknown', '2016-06-03', '/images/upcoming/7nh8Vgs5AtZdZg7vMOXTPyZYfvR.jpg'),
(389297, 'Believeland', '2016-05-14', '/images/upcoming/kpBqxDWL1WD6mSnibAbwILKgiuU.jpg'),
(389053, 'The Do-Over', '2016-05-27', '/images/upcoming/pYzHflb8QgQszkR4Ku8mWrJAYfA.jpg'),
(392569, 'Aadupuliyattam 2016', '2016-05-13', '/images/upcoming/ihCdEcWC6YVGG8zFOn4ojgCaaiV.jpg'),
(271404, 'Beyond Skyline', '2016-06-01', '/images/upcoming/csQoJ3HW3T0C1iAQ1rlqySjFMW1.jpg'),
(392824, 'The Last Resort', '2016-05-14', '/images/upcoming/tYH7gqPHniQmLC2aWMFWm8bRFF1.jpg'),
(395298, 'TLMEA', '2016-05-15', '/images/upcoming/2f7s3BmOyk64KWN21mywNp53OlT.jpg'),
(347123, 'All the Way', '2016-05-21', '/images/upcoming/hTEQhl6nbaZLn8QVW4Ot0wQaUXY.jpg'),
(392628, 'Karen Kingsbury''s A Time to Dance', '2016-05-15', '/images/upcoming/uiyVSsfWB5MOezRpYnxpxkdRwRn.jpg'),
(379500, 'Under the Gun', '2016-05-13', '/images/upcoming/fiCDf3MhbIUCNRngeG1VN2EBGRl.jpg'),
(392818, 'The Transfiguration', '2016-05-14', '/images/upcoming/8Pu8COP8TawdhJ2hbeN3VvxKTSM.jpg'),
(392506, 'A.C. Green: Iron Virgin', '2016-05-13', '/images/upcomingnull'),
(390608, 'The Abolitionists', '2016-05-16', '/images/upcoming/7WrskatwwRZ6ghLebOmGSwimnfm.jpg'),
(369756, 'The hollow crown: Richard III', '2016-05-21', '/images/upcoming/l9QWG9KGvYZeblt0TGJrrEQRpUQ.jpg'),
(392820, 'Gimme Danger', '2016-05-14', '/images/upcomingnull'),
(392804, 'Beyond the Mountains and Hills', '2016-05-14', '/images/upcomingnull'),
(392817, 'The Student', '2016-05-14', '/images/upcomingnull'),
(392801, 'Exile', '2016-05-14', '/images/upcoming/4saHndeQWBpe1SIwqkYckJvFneV.jpg'),
(392800, 'Hissein Habré, A Chadian Tragedy', '2016-05-14', '/images/upcomingnull'),
(392803, 'Le Cancre', '2016-05-14', '/images/upcomingnull'),
(392795, 'Harmonium', '2016-05-14', '/images/upcomingnull'),
(393658, 'Tulips in Spring', '2016-05-14', '/images/upcoming/1wtwIKiQDxVEVnLoCAUVeYIMtPS.jpg'),
(392809, 'Francisco Sanctis''s Long Night', '2016-05-14', '/images/upcomingnull'),
(392812, 'Dogs', '2016-05-14', '/images/upcomingnull'),
(389482, 'gas_n_go032416', '2016-05-16', '/images/upcoming/aRR5IhnAZVbwgr1PLnWMltvKGUi.jpg'),
(311667, 'Manhattan Night', '2016-05-20', '/images/upcomingnull'),
(340945, 'USS Indianapolis: Men of Courage', '2016-05-30', '/images/upcomingnull'),
(391709, 'Apprentice', '2016-06-01', '/images/upcoming/vT77JpkiY8DHqBjYDE9wlp4Z6H9.jpg'),
(395982, 'Prevenge', '2016-05-15', '/images/upcomingnull'),
(392440, 'Highly Strung', '2016-05-16', '/images/upcoming/aOkF5bQEDqiD8qKV2K2OQz2qdDc.jpg'),
(393170, 'Kaptaan', '2016-05-20', '/images/upcomingnull'),
(368596, 'Back in the Day', '2016-05-20', '/images/upcoming/vsZmKHFlquXPmkWHArIaTIXT5Xz.jpg'),
(382493, '2 Hours 2 Vegas', '2016-05-17', '/images/upcomingnull'),
(393421, 'Sarbjit', '2016-05-20', '/images/upcoming/1Ny6CzNJZ8uEkHSsSl9opVTN7W5.jpg'),
(389427, 'Hard Sell', '2016-05-20', '/images/upcoming/sqazCML0j2Ry3Ekc42O35ilB62J.jpg'),
(393659, 'Ms. Matched', '2016-05-28', '/images/upcomingnull'),
(376261, 'Weiner', '2016-05-20', '/images/upcoming/hPDRCuj21kEAcR4KaEVxJ2x4hMH.jpg'),
(394143, 'Wrong Elements', '2016-05-20', '/images/upcomingnull'),
(392507, 'The Shining Star of Losers Everywhere', '2016-05-20', '/images/upcoming/wfAvsmcEjKXkYxPEb1zb3KEuuaL.jpg'),
(381035, 'Jean of the Joneses', '2016-06-01', '/images/upcomingnull'),
(341012, 'Popstar: Never Stop Never Stopping', '2016-06-03', '/images/upcoming/2z77Qe6GgnlZN2ycqmxo6LibNbF.jpg'),
(395876, 'WWE Extreme Rules 2016', '2016-05-22', '/images/upcoming/3ffcxQcpun2Y8NCfvvsPyaY5FeB.jpg'),
(354979, 'Dog Eat Dog', '2016-05-31', '/images/upcoming/7Ns2chQFGpp5bq8KqV8h9wJvTfI.jpg'),
(370994, 'Udanchhoo', '2016-05-20', '/images/upcomingnull'),
(394049, 'Almost Holy', '2016-05-20', '/images/upcomingnull'),
(393656, 'Date with Love', '2016-05-21', '/images/upcoming/glDj4YNuUS4anPI2iKx2HI5bfHe.jpg'),
(358110, 'Artemis Fowl', '2016-06-01', '/images/upcoming/eV9xyUNngntrYtrGUIEs2oI9zEW.jpg'),
(394692, 'Paint It Black', '2016-06-01', '/images/upcomingnull'),
(391773, 'Kamp Holland', '2016-05-22', '/images/upcomingnull'),
(338766, 'Hell or High Water', '2016-05-20', '/images/upcoming/d3wJ0A6gyg1gqS3QdozVKArfADU.jpg'),
(375573, 'The Richie McCaw Movie', '2016-05-26', '/images/upcoming/b3BucFe1yPcyRB2rTyxdjxa6Jb.jpg'),
(394315, 'Midori', '2016-05-21', '/images/upcoming/hxARo7g7VdRZhIIAg9iorC9SDxI.jpg'),
(313723, 'Deep Cover', '2016-06-01', '/images/upcomingnull'),
(396135, 'Gold Balls', '2016-05-21', '/images/upcomingnull'),
(394822, 'London Town', '2016-06-01', '/images/upcomingnull'),
(391775, 'Moos', '2016-05-29', '/images/upcomingnull'),
(396087, 'The IF Project', '2016-05-21', '/images/upcomingnull'),
(381831, 'Souls', '2016-05-31', '/images/upcoming/m8BgKXYf7xtLSHYMT3KA1PhIlkj.jpg'),
(381520, 'Alan Clarke: Out of His Own Light', '2016-05-23', '/images/upcomingnull'),
(396126, 'Sustainable', '2016-05-22', '/images/upcomingnull'),
(394047, 'The Dog Lover', '2016-05-22', '/images/upcomingnull'),
(296293, 'As They Continue to Fall', '2016-06-01', '/images/upcoming/zV0Eny75fHr1iCpN11mPapayZ90.jpg'),
(394697, 'Blood Stripe', '2016-06-02', '/images/upcomingnull'),
(396084, 'Hummus', '2016-05-24', '/images/upcomingnull'),
(341853, 'Seen and Not Seen', '2016-05-26', '/images/upcomingnull'),
(356332, 'The Witness', '2016-06-03', '/images/upcoming/4p5y5zUXQ23gVUIiUqLsardjDoT.jpg'),
(292280, 'Bye Bye Man', '2016-06-03', '/images/upcoming/hPO2nsNbvRx02RIQZKxHEgK7YZh.jpg'),
(394770, '11:55', '2016-06-02', '/images/upcomingnull'),
(375533, 'Wolf Girl and Black Prince', '2016-05-28', '/images/upcoming/iJwvj600FOsS8jCR85x5ARTf4Ud.jpg'),
(393921, 'The Ego Death', '2016-05-31', '/images/upcoming/59nn7um21ziOnNzsAJMQ9VQMtm7.jpg'),
(391755, 'Vaapsi Punjabi Film', '2016-05-27', '/images/upcoming/wQVfO2JJAFonrL8J4zru6ONVjE.jpg'),
(391756, 'Saadey CM Saab', '2016-05-27', '/images/upcoming/uK4lJ56xxVq8ujWmdAqmyqgg5MH.jpg'),
(333485, 'The Leviathan', '2016-06-03', '/images/upcoming/aXKziDHHrYYUJ0HPo57xOBmS0WR.jpg'),
(373922, 'Three', '2016-06-02', '/images/upcoming/j8SzMGYXu88ucNQWMo70pYKWKer.jpg'),
(396121, 'Tsukiji Wonderland', '2016-05-31', '/images/upcomingnull'),
(391754, 'Gelo', '2016-05-30', '/images/upcoming/vO7w0nMCkC78GcDcUDTP5NYVpkL.jpg'),
(382154, 'Distraction Babies', '2016-05-31', '/images/upcoming/sAm2qheyzVhUyA3KTHrYihEGRxx.jpg'),
(391779, 'Housefull 3', '2016-06-03', '/images/upcoming/c4CbnWfFFVCFmF2tEZcMPHP8Jny.jpg'),
(380623, 'Nocturama', '2016-05-31', '/images/upcomingnull'),
(325907, 'Docent', '2016-06-01', '/images/upcomingnull'),
(396099, 'Paralytic', '2016-06-03', '/images/upcomingnull'),
(393154, 'The Amityville Legacy', '2016-06-01', '/images/upcoming/4qP0aPlzuB8YBhPhioT8iSW0VvE.jpg'),
(367686, 'The Anthropologist', '2016-06-01', '/images/upcomingnull'),
(394711, 'Destined', '2016-06-03', '/images/upcomingnull'),
(280489, 'Mettle of Honor', '2016-06-03', '/images/upcoming/cZDgWnODc1Ap3m8RZTPgAabrxjo.jpg'),
(391105, 'Amma Kanakku', '2016-06-03', '/images/upcoming/7qF8EXwM872OANkNbDQk4j702hr.jpg'),
(263537, 'Near Myth: The Oskar Knight Story', '2016-06-03', '/images/upcoming/fzEXb6AKblbPP63rBctoJp2wV97.jpg'),
(263482, 'Vaarayo Vennilave', '2016-06-03', '/images/upcoming/azdVIWbnikpfLqPcwM0dw8PoDFv.jpg'),
(393561, 'Risk', '2016-05-19', '/images/upcoming/fk29cMaf94jIB3QLJkX19STBVtx.jpg'),
(349164, 'Neon', '2016-06-02', '/images/upcoming/s2W1Ntdmv0xNDg7rgIyuumlUeYo.jpg'),
(334532, 'A Hundred Streets', '2016-06-02', '/images/upcomingnull'),
(393732, 'Mean Dreams', '2016-05-15', '/images/upcomingnull'),
(379624, 'Kitty', '2016-05-20', '/images/upcomingnull'),
(290250, 'The Nice Guys', '2016-05-15', '/images/upcoming/vNCeqxbKyDHL9LUza03V2Im16wB.jpg'),
(391778, 'Azhar', '2016-05-13', '/images/upcoming/1r1GUSgcxSUIsRDvboP6ZE3Bdx.jpg'),
(365941, 'The Darkness', '2016-05-13', '/images/upcomingnull'),
(68735, 'Warcraft', '2016-05-25', '/images/upcoming/ckpiTY8MSnQf7C5eQUxZScRYLyI.jpg'),
(257345, 'The Darkness', '2016-05-13', '/images/upcoming/RtpVLFlD2j8kA08RMgjqj1Orex.jpg'),
(308531, 'Teenage Mutant Ninja Turtles: Out of the Shadows', '2016-06-01', '/images/upcoming/iCzrCEjnWhPw4fmPgO4cN6KEU8X.jpg'),
(395604, 'The Hollow Crown: Henry VI - part 2', '2016-05-14', '/images/upcoming/l9QWG9KGvYZeblt0TGJrrEQRpUQ.jpg'),
(325373, 'Two Lovers and a Bear', '2016-05-18', '/images/upcoming/y6tf2KSkKkd4ADvhVlyOunUiHcG.jpg'),
(392796, 'Personal Affairs', '2016-05-14', '/images/upcomingnull'),
(267800, 'Sundown', '2016-05-16', '/images/upcoming/b7VGBfKa6RO9rqL0pJZlg8VGGzV.jpg'),
(296360, 'Love & Friendship', '2016-05-13', '/images/upcoming/1EPLnpeu606BicC9YNo6FGf7S5e.jpg'),
(388440, 'The Curse of Sleeping Beauty', '2016-05-13', '/images/upcoming/vDvTlE4dJBBTRDGQ2xeq0MhEooJ.jpg'),
(254302, 'High-Rise', '2016-05-13', '/images/upcoming/grgPRTKTnm7ktOiSSNFcutiv0vS.jpg'),
(310119, 'Last Days in the Desert', '2016-05-13', '/images/upcoming/f0ZDf7hPDxIz97eRbZ851DAsYgu.jpg'),
(241259, 'Alice Through the Looking Glass', '2016-05-25', '/images/upcoming/1EHKlvLk5kdBHLXir31DIXscSuZ.jpg'),
(384798, 'Kill Command', '2016-05-13', '/images/upcoming/oQkCrwSURdoN9THmTgdfnuAtHPR.jpg'),
(332411, 'I Am Wrath', '2016-05-13', '/images/upcoming/U4zfGtnQP1htSrnMzYwcTBL8Vc.jpg'),
(246655, 'X-Men: Apocalypse', '2016-05-18', '/images/upcoming/zSouWWrySXshPCT4t3UKCQGayyo.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
