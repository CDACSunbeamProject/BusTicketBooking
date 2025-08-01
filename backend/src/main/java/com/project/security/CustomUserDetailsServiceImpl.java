package com.project.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.daos.UserDao;
import com.project.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	//depcy
		private UserDao userDao;

		@Override
		public UserDetails loadUserByUsername(String email) throws 
		UsernameNotFoundException {
			User user=userDao.findByEmail(email)
					.orElseThrow(() 
							-> new UsernameNotFoundException("Invalid email !!!!!!"));
			
			return user;
		}
}
