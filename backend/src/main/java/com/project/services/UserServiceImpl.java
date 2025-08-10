package com.project.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.custom_exceptions.ApiException;
import com.project.daos.BookingDao;
import com.project.daos.UserDao;
import com.project.dto.BookingRespDTO;
import com.project.dto.BusRespDTO;
import com.project.dto.UserProfileDTO;
import com.project.dto.UserRequestDTO;
import com.project.dto.UserRespDTO;
import com.project.entities.Booking;
import com.project.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	// depcy
	private final UserDao userDao;
	private ModelMapper mapper;
	private PasswordEncoder passwordEncoder;
	private ModelMapper modelMapper;
	private BookingDao bookingDao;

	@Override
	public UserRespDTO signUp(UserRequestDTO dto) {
		// 1. check for dup email
		if (userDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Dup Email detected - User exists already!!!!");
		// 2. dto -> entity

		User entity = mapper.map(dto, User.class);
		// 3. encrypt password
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		// 4. save the entity n map persistent entity -> resp dto
		return mapper.map(userDao.save(entity), UserRespDTO.class);
	}

	@Override
	public UserProfileDTO getUserProfileDetails(String email) {
		System.out.println("inside profile update");
		User user = userDao.findByEmail(email)
				.orElseThrow(() -> new ApiException("User Not Found with email:" + email));

		UserProfileDTO userProfile = new UserProfileDTO();
		userProfile.setId(user.getId());
		userProfile.setName(user.getName());
		userProfile.setEmail(user.getEmail());
		userProfile.setAge(user.getAge());
		userProfile.setGender(user.getGender());
		userProfile.setPhone(user.getPhone());
		return userProfile;
	}

	@Override
	public List<BookingRespDTO> getMyBookings(String email) {
		User user = userDao.findByEmail(email)
				.orElseThrow(() -> new ApiException("User Not Found with email:" + email));

		List<Booking> bookings = user.getBookings();
		List<BookingRespDTO> allBookings = new ArrayList<>();
		for (Booking myBooking : bookings) {

			BookingRespDTO b = new BookingRespDTO();
			b.setBookingId(myBooking.getId());
			b.setBookingTime(myBooking.getCreationDateTime().toString());
			b.setBookingStatus(myBooking.getStatus());
			b.setTotalAmount(myBooking.getTotalFare());
			b.setPaymentStatus(myBooking.getPayment().getStatus());

			BusRespDTO bus = new BusRespDTO();
			bus.setBusNo(myBooking.getBus().getBusNo());
			bus.setBusName(myBooking.getBus().getBusName());
			bus.setBusType(myBooking.getBus().getBusType());
			bus.setSeatType(myBooking.getBus().getSeatType());
			bus.setOperatorName(myBooking.getBus().getOperatorName());
			bus.setNoOfSeats(myBooking.getBus().getNoOfSeats());
			bus.setStartLocation(myBooking.getBus().getBusRoute().getStartLocation());
			bus.setEndLocation(myBooking.getBus().getBusRoute().getEndLocation());
			bus.setDepartureDate(myBooking.getBus().getDepartureDate());
			bus.setDepartureTime(myBooking.getBus().getDepartureTime());
			bus.setArrivalDate(myBooking.getBus().getArrivalDate());
			bus.setArrivalTime(myBooking.getBus().getArrivalTime());
			bus.setDuration(myBooking.getBus().getDuration());
			bus.setPrice(myBooking.getBus().getPrice());
			bus.setRating(myBooking.getBus().getRating());
			try {
				bus.setAmenities(myBooking.getBus().getAmenitiesList());
			} catch (Exception e) {
				bus.setAmenities(new ArrayList<String>());
				e.printStackTrace();
			}
			b.setBus(bus);
			allBookings.add(b);
		}
		return allBookings;
	}
	
	public long getTotalAmount() {
		List<User> users= userDao.findAll();
		long totalAmount = 0;
		for(User u:users) {
			List<Booking> bookings=u.getBookings();
			for(Booking b: bookings) {
				totalAmount += (long) b.getTotalFare();
			}
		}
		return totalAmount;
	}
	
	@Override
	public Long getAllBookings() {
		System.out.println("inside all bookings");
		List<User> users=userDao.findAll();
		Long totalBookings = 0L;
		for(User user:users) {
			totalBookings+=user.getBookings().size();
		}
		return totalBookings;
	}
	@Override
	public List<UserRespDTO> getAllUsers() {
		System.out.println("inside service");
	    try {
	        List<User> users = userDao.findAll();
	        return users.stream()
	            .map(user -> modelMapper.map(user, UserRespDTO.class))
	            .toList();
	    } catch (Exception e) {
	        // Log exception details
	        System.err.println("Error fetching users: " + e.getMessage());
	        e.printStackTrace();
	        throw e; // or return empty list / handle gracefully
	    }
	}
	@Override
	public UserProfileDTO updateProfile(UserProfileDTO dto) {
		User user=userDao.findByEmail(dto.getEmail()).orElseThrow();
		user.setAge(dto.getAge());
		user.setGender(dto.getGender());
		user.setName(dto.getName());
		user.setPhone(dto.getPhone());
		userDao.save(user);
		return modelMapper.map(user, UserProfileDTO.class);
	}
}
